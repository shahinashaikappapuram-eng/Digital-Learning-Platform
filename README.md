# Smart Education

## Run the application with the Gemini AI tutor

1. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).
2. In PowerShell, copy the example configuration: `Copy-Item .env.example .env`.
3. Open `.env` in your editor and replace `replace_with_your_server_side_gemini_api_key` with your key. Do not share the key, put it in frontend code, or commit `.env`.
4. Run `npm run dev`. This starts both the AI API and Vite; open the Vite URL printed in the terminal. If the app is already running, stop it with Ctrl+C and restart it so the server loads the key.

The Vite development server proxies `/api` requests to the local API server. A valid API key is required for real Gemini answers; code cannot generate Gemini responses without Google credentials. Deployments must also route `/api/doubt-answer` to `server.js` (or an equivalent secured backend) and configure `GEMINI_API_KEY` as a server-side environment variable. The server applies a per-IP request limit and a question length limit.

If the tutor reports that Gemini rejected the API key, create a fresh key in Google AI Studio and replace the entire value of `GEMINI_API_KEY` in `.env` with that key only. Do not include quotes, explanatory text, or angle brackets. Restart `npm run dev` after changing the file. Quota errors require checking the key's quota in Google AI Studio; model errors require checking the configured model in `server.js`.

The rest of this document describes the default Vite template.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
