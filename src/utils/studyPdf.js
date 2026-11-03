const PAGE_WIDTH = 1240;
const PAGE_HEIGHT = 1754;
const MARGIN = 96;

const encode = (value) => new TextEncoder().encode(value);

const wrapText = (context, text, maxWidth) => {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";

  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (line && context.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });

  if (line) lines.push(line);
  return lines;
};

const createPdfPage = () => {
  const canvas = document.createElement("canvas");
  canvas.width = PAGE_WIDTH;
  canvas.height = PAGE_HEIGHT;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser could not prepare the PDF.");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, PAGE_WIDTH, PAGE_HEIGHT);
  return { canvas, context, y: MARGIN };
};

const pdfFromImages = (pages) => {
  const objects = [];
  const addObject = (value) => {
    objects.push(typeof value === "string" ? encode(value) : value);
    return objects.length;
  };

  addObject("<< /Type /Catalog /Pages 2 0 R >>");
  const pageIds = pages.map((_, index) => 3 + index * 3);
  addObject(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>`);

  pages.forEach(({ canvas }, index) => {
    const pageId = pageIds[index];
    const imageId = pageId + 1;
    const contentId = pageId + 2;
    const imageData = canvas.toDataURL("image/jpeg", 0.92).split(",")[1];
    const binary = atob(imageData);
    const jpeg = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) jpeg[i] = binary.charCodeAt(i);

    addObject(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Im0 ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>`
    );
    addObject(new Uint8Array([
      ...encode(`<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`),
      ...jpeg,
      ...encode("\nendstream")
    ]));
    const content = encode("q 595 0 0 842 0 0 cm /Im0 Do Q");
    addObject(new Uint8Array([
      ...encode(`<< /Length ${content.length} >>\nstream\n`),
      ...content,
      ...encode("\nendstream")
    ]));
  });

  const chunks = [encode("%PDF-1.4\n")];
  const offsets = [0];
  let length = chunks[0].length;
  objects.forEach((object, index) => {
    offsets.push(length);
    const wrapped = [
      encode(`${index + 1} 0 obj\n`),
      object,
      encode("\nendobj\n")
    ];
    wrapped.forEach((chunk) => {
      chunks.push(chunk);
      length += chunk.length;
    });
  });

  const xrefOffset = length;
  const xref = [
    `xref\n0 ${objects.length + 1}\n`,
    "0000000000 65535 f \n",
    ...offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`),
    `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`
  ].join("");
  chunks.push(encode(xref));

  return new Blob(chunks, { type: "application/pdf" });
};

export const downloadStudyPdf = ({ filename, title, subtitle, metadata, sections }) => {
  const pages = [];
  let page = createPdfPage();
  pages.push(page);

  const addPage = () => {
    page = createPdfPage();
    pages.push(page);
  };

  const writeLines = (text, { font, color, lineHeight, indent = 0, gap = 0 }) => {
    page.context.font = font;
    page.context.fillStyle = color;
    const lines = wrapText(page.context, text, PAGE_WIDTH - MARGIN * 2 - indent);
    lines.forEach((line) => {
      if (page.y + lineHeight > PAGE_HEIGHT - MARGIN - 40) addPage();
      page.context.font = font;
      page.context.fillStyle = color;
      page.context.fillText(line, MARGIN + indent, page.y);
      page.y += lineHeight;
    });
    page.y += gap;
  };

  page.context.fillStyle = "#1e60f8";
  page.context.fillRect(MARGIN, page.y, PAGE_WIDTH - MARGIN * 2, 10);
  page.y += 52;
  writeLines("SMART EDUCATION • STUDY MATERIAL", {
    font: '700 22px "Nirmala UI", "Segoe UI", sans-serif',
    color: "#1e60f8",
    lineHeight: 34,
    gap: 12
  });
  writeLines(title, {
    font: '700 40px "Nirmala UI", "Segoe UI", sans-serif',
    color: "#0f172a",
    lineHeight: 52,
    gap: 10
  });
  writeLines(subtitle, {
    font: '24px "Nirmala UI", "Segoe UI", sans-serif',
    color: "#475569",
    lineHeight: 36,
    gap: 24
  });

  metadata.forEach(({ label, value }) => {
    writeLines(`${label}: ${value}`, {
      font: '20px "Nirmala UI", "Segoe UI", sans-serif',
      color: "#334155",
      lineHeight: 30
    });
  });
  page.y += 24;

  sections.forEach(({ heading, content }) => {
    if (page.y > PAGE_HEIGHT - MARGIN - 130) addPage();
    writeLines(heading, {
      font: '700 25px "Nirmala UI", "Segoe UI", sans-serif',
      color: "#0f172a",
      lineHeight: 38,
      gap: 8
    });
    String(content)
      .split(/\n+/)
      .filter(Boolean)
      .forEach((paragraph) => {
        writeLines(paragraph, {
          font: '22px "Nirmala UI", "Segoe UI", sans-serif',
          color: "#334155",
          lineHeight: 36,
          indent: 12,
          gap: 12
        });
      });
    page.y += 12;
  });

  pages.forEach(({ context }, index) => {
    context.fillStyle = "#64748b";
    context.font = '18px "Nirmala UI", "Segoe UI", sans-serif';
    context.fillText("Smart Education • Learning resource", MARGIN, PAGE_HEIGHT - 45);
    const pageLabel = `Page ${index + 1} of ${pages.length}`;
    context.fillText(pageLabel, PAGE_WIDTH - MARGIN - context.measureText(pageLabel).width, PAGE_HEIGHT - 45);
  });

  const blob = pdfFromImages(pages);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};
