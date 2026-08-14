import { spawn } from "node:child_process";
import { rmSync } from "node:fs";
import { join } from "node:path";

const command = process.argv[2];
const allowed = new Set(["dev", "build", "start"]);

if (!allowed.has(command)) {
  console.error("Usage: node scripts/run-vinext.mjs <dev|build|start>");
  process.exit(1);
}

const executable = process.execPath;
const cli = join("node_modules", "vinext", "dist", "cli.js");

if (command === "build") {
  rmSync("dist", { recursive: true, force: true });
}

const child = spawn(executable, [cli, command], {
  env: {
    ...process.env,
    WRANGLER_LOG_PATH: ".wrangler/wrangler.log",
  },
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  }
  process.exit(code ?? 0);
});
