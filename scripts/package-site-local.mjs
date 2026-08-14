import { execFileSync } from "node:child_process";
import { cpSync, copyFileSync, existsSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

const project = process.cwd();
const archive = process.argv[2];

if (!archive) {
  console.error("Usage: node scripts/package-site-local.mjs <archive.tar.gz>");
  process.exit(1);
}

const stage = join(tmpdir(), `sites-stage-${Date.now()}`);

mkdirSync(join(stage, "dist", ".openai"), { recursive: true });
cpSync(join(project, "dist"), join(stage, "dist"), { recursive: true });
copyFileSync(
  join(project, ".openai", "hosting.json"),
  join(stage, "dist", ".openai", "hosting.json"),
);

if (existsSync(join(project, "drizzle"))) {
  mkdirSync(join(stage, "dist", ".openai", "drizzle"), { recursive: true });
  cpSync(join(project, "drizzle"), join(stage, "dist", ".openai", "drizzle"), {
    recursive: true,
  });
}

mkdirSync(dirname(archive), { recursive: true });
execFileSync("tar", ["-C", stage, "-czf", archive, "dist"], {
  stdio: "inherit",
});

const entries = execFileSync("tar", ["-tzf", archive], { encoding: "utf8" });
if (!entries.includes("dist/server/index.js")) {
  throw new Error("Missing dist/server/index.js in archive");
}
if (!entries.includes("dist/.openai/hosting.json")) {
  throw new Error("Missing dist/.openai/hosting.json in archive");
}

console.log(archive);
