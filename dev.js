import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import process from "node:process";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const apiPort = process.env.API_PORT || "3001";
const children = [];
let shuttingDown = false;

const stopProcesses = (exitCode = 0) => {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    if (child.exitCode === null) child.kill();
  }
  process.exitCode = exitCode;
};

const startProcess = (name, args) => {
  const child = spawn(process.execPath, args, {
    cwd: projectRoot,
    env: process.env,
    stdio: "inherit",
  });
  children.push(child);
  child.on("error", (error) => {
    console.error(`${name} could not start: ${error.message}`);
    stopProcesses(1);
  });
  child.on("exit", (code, signal) => {
    if (shuttingDown) return;
    console.error(`${name} stopped${signal ? ` (${signal})` : ` with exit code ${code}`}.`);
    stopProcesses(code || 1);
  });
  return child;
};

const waitForApi = async () => {
  for (let attempt = 0; attempt < 30 && !shuttingDown; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${apiPort}/api/health`, {
        signal: AbortSignal.timeout(1000),
      });
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }
  throw new Error(`The AI API did not become ready on port ${apiPort}.`);
};

process.on("SIGINT", () => stopProcesses(0));
process.on("SIGTERM", () => stopProcesses(0));

console.log("Starting the AI API...");
startProcess("AI API", [join(projectRoot, "server.js")]);

try {
  await waitForApi();
  if (!shuttingDown) {
    console.log("AI API is ready. Starting Vite...");
    startProcess("Vite", [join(projectRoot, "node_modules", "vite", "bin", "vite.js"), ...process.argv.slice(2)]);
  }
} catch (error) {
  console.error(error.message);
  stopProcesses(1);
}
