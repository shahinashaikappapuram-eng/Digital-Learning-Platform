import { createServer } from "node:http";
import process from "node:process";

const port = Number(process.env.API_PORT || 3001);
const model = "gemini-3.5-flash-lite";
const requestWindowMs = 60_000;
const maxRequestsPerWindow = 10;
const maxQuestionLength = 2000;
const requestsByAddress = new Map();
const getGeminiApiKey = () => {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (
    !apiKey ||
    /replace_with|your_key|paste_your_key|placeholder/i.test(apiKey) ||
    /^https?:\/\//i.test(apiKey)
  ) {
    return null;
  }
  return apiKey;
};

const sendJson = (response, status, payload) => {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
};

const readJsonBody = (request) =>
  new Promise((resolve, reject) => {
    let body = "";
    let settled = false;

    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      if (settled) return;
      body += chunk;
      if (body.length > maxQuestionLength + 500) {
        settled = true;
        reject(new Error("Request body is too large."));
        request.resume();
      }
    });
    request.on("end", () => {
      if (settled) return;
      try {
        settled = true;
        resolve(JSON.parse(body));
      } catch {
        settled = true;
        reject(new Error("Request body must be valid JSON."));
      }
    });
    request.on("error", (error) => {
      if (settled) return;
      settled = true;
      reject(error);
    });
  });

const isRateLimited = (address) => {
  const now = Date.now();
  const existing = requestsByAddress.get(address);
  if (!existing || now - existing.startedAt >= requestWindowMs) {
    requestsByAddress.set(address, { startedAt: now, count: 1 });
    return false;
  }

  existing.count += 1;
  return existing.count > maxRequestsPerWindow;
};

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url || "/", "http://localhost");

  if (request.method === "GET" && requestUrl.pathname === "/api/health") {
    sendJson(response, 200, { ok: true, configured: Boolean(getGeminiApiKey()) });
    return;
  }

  if (request.method !== "POST" || requestUrl.pathname !== "/api/doubt-answer") {
    sendJson(response, 404, { error: "Endpoint not found." });
    return;
  }

  if (isRateLimited(request.socket.remoteAddress || "unknown")) {
    sendJson(response, 429, { error: "Too many requests. Please wait a minute and try again." });
    return;
  }

  const geminiApiKey = getGeminiApiKey();
  if (!geminiApiKey) {
    const configuredValue = process.env.GEMINI_API_KEY?.trim() || "";
    const error = /^https?:\/\//i.test(configuredValue)
      ? "GEMINI_API_KEY contains a website URL, not an API key. Open https://aistudio.google.com/apikey, create or copy an API key from the API Keys section, paste the key itself after GEMINI_API_KEY= in .env, then restart npm run dev."
      : "Gemini is not configured. Open https://aistudio.google.com/apikey, create or copy an API key, paste the key itself after GEMINI_API_KEY= in .env, then restart npm run dev. Keep the key private.";
    sendJson(response, 503, {
      error,
    });
    return;
  }

  let payload;
  try {
    payload = await readJsonBody(request);
  } catch (error) {
    if (!response.destroyed) {
      sendJson(response, 400, { error: error.message });
    }
    return;
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    sendJson(response, 400, { error: "Request body must be a JSON object." });
    return;
  }
  const subject = typeof payload.subject === "string" ? payload.subject.trim() : "";
  const question = typeof payload.question === "string" ? payload.question.trim() : "";
  const requestedClassLevel = typeof payload.classLevel === "string" ? payload.classLevel.trim() : "";
  const classLevel = ["6", "7", "8", "9", "10"].includes(requestedClassLevel)
    ? requestedClassLevel
    : "";
  if (!subject || !question || question.length > maxQuestionLength) {
    sendJson(response, 400, {
      error: `Enter a subject and a question of no more than ${maxQuestionLength} characters.`,
    });
    return;
  }

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": geminiApiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: "You are a careful school tutor. Directly answer the student's specific question in clear, age-appropriate language. Explain reasoning step by step when useful. If the question is unclear, ask a clarifying question. Never replace an answer with generic study advice, invent facts, or claim certainty when uncertain; state uncertainty and encourage checking with their teacher when appropriate.",
            }],
          },
          contents: [{
            role: "user",
            parts: [{
              text: `Subject: ${subject}${classLevel ? `\nStudent class: ${classLevel}` : ""}\nQuestion: ${question}`,
            }],
          }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 700 },
        }),
        signal: AbortSignal.timeout(30_000),
      },
    );

    const result = await geminiResponse.json();
    if (!geminiResponse.ok) {
      const apiError = result.error || {};
      const apiMessage = typeof apiError.message === "string" ? apiError.message.toLowerCase() : "";
      console.error(
        "Gemini request failed with status",
        geminiResponse.status,
        apiError.status || "unknown",
        apiError.code || "unknown",
      );

      const isInvalidApiKey = /api key|api_key|credential/.test(apiMessage);
      const errorMessage = isInvalidApiKey || geminiResponse.status === 401 || geminiResponse.status === 403
        ? "Gemini rejected the API key. Verify GEMINI_API_KEY in .env is a valid Google AI Studio key, with no extra text or quotes, then restart npm run dev."
        : geminiResponse.status === 404
        ? "Gemini could not find the configured model. Check the model name in server.js and try again."
        : geminiResponse.status === 429
        ? "Gemini's quota or rate limit has been reached. Check the key's Google AI Studio quota and try again later."
        : geminiResponse.status === 400
        ? "Gemini rejected the question request. Check the question and server model configuration, then try again."
        : geminiResponse.status >= 500
        ? "Gemini is temporarily unavailable. Please try again later."
        : "The AI tutor request failed. Check the server terminal for the Gemini HTTP status and try again.";
      sendJson(response, 502, { error: errorMessage });
      return;
    }

    const answer = result.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!answer) {
      sendJson(response, 502, { error: "The AI tutor returned no answer. Please try again." });
      return;
    }

    sendJson(response, 200, { answer });
  } catch (error) {
    console.error("Gemini request could not be completed:", error.name);
    const errorMessage = error.name === "TimeoutError" || error.name === "AbortError"
      ? "Gemini took too long to respond. Please try again."
      : "The server could not connect to Gemini. Check the server's internet connection and try again.";
    sendJson(response, 502, { error: errorMessage });
  }
});

server.listen(port, () => {
  console.log(`AI tutor API listening on http://localhost:${port}`);
});
