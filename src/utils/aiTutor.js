export async function requestAiTutorAnswer({ subject, question, classLevel }) {
  let response;
  try {
    response = await fetch("/api/doubt-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, question, classLevel }),
    });
  } catch {
    throw new Error("The AI service is unavailable. Restart the app with npm run dev and try again.");
  }

  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new Error("The AI service returned an invalid response. Please try again.");
  }

  if (!response.ok) {
    throw new Error(payload?.error || "The AI tutor could not answer right now. Please try again.");
  }

  if (typeof payload?.answer !== "string" || !payload.answer.trim()) {
    throw new Error("The AI tutor returned no answer. Please try again.");
  }

  return payload.answer.trim();
}
