export const MAX_TUTOR_ATTACHMENT_SIZE = 5 * 1024 * 1024;
export const TUTOR_ATTACHMENT_TYPES = ["image/jpeg", "image/png", "application/pdf"];
export const TUTOR_ATTACHMENT_ACCEPT = ".jpg,.jpeg,.png,.pdf";

export const getTutorAttachmentError = (file) => {
  if (!file) return "";
  if (!TUTOR_ATTACHMENT_TYPES.includes(file.type)) {
    return "Choose a JPEG, PNG, or PDF file.";
  }
  if (file.size > MAX_TUTOR_ATTACHMENT_SIZE) {
    return "Files must be 5 MB or smaller.";
  }
  return "";
};

export const encodeTutorAttachment = async (file) => {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = "";
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }

  return {
    mimeType: file.type,
    dataBase64: btoa(binary),
  };
};
