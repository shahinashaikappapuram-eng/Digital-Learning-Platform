import { encodeTutorAttachment } from "./tutorAttachments";

export async function requestAiTutorAnswer({ subject, question, classLevel, attachment }) {
  const payload = { subject, question, classLevel };
  if (attachment) {
    payload.attachment = await encodeTutorAttachment(attachment);
  }

  let response;
  try {
    response = await fetch("/api/doubt-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("The AI service is unavailable. Restart the app with npm run dev and try again.");
  }

  let responsePayload;
  try {
    responsePayload = await response.json();
  } catch {
    throw new Error("The AI service returned an invalid response. Please try again.");
  }

  if (!response.ok) {
    throw new Error(responsePayload?.error || "The AI tutor could not answer right now. Please try again.");
  }

  if (typeof responsePayload?.answer !== "string" || !responsePayload.answer.trim()) {
    throw new Error("The AI tutor returned no answer. Please try again.");
  }

  return responsePayload.answer.trim();
}
