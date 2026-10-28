import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("=================================================================");
console.log("✦ STARTING CRUNCH KINGDOM FULL-STACK ENGINE (REACT + NODE.JS) ✦");
console.log("=================================================================");

const isWin = process.platform === "win32";
const npmCmd = isWin ? "npm.cmd" : "npm";

// 1. Start Node.js Express Backend on port 5001
const backend = spawn("node", ["src/server.js"], {
  cwd: path.join(__dirname, "backend"),
  stdio: "inherit",
  shell: true
});

// 2. Start Vite React Frontend on port 3000
const frontend = spawn(npmCmd, ["run", "dev"], {
  cwd: path.join(__dirname, "frontend"),
  stdio: "inherit",
  shell: true
});

const cleanup = () => {
  console.log("\n✦ Shutting down Crunch Kingdom processes...");
  backend.kill();
  frontend.kill();
  process.exit(0);
};

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

