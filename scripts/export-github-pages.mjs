import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const siteBase = "/landing-humberto-salleg";
const outputDir = join("dist", "pages");

async function renderHome() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("pages-export", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  if (!response.ok) {
    throw new Error(`Static render failed with status ${response.status}`);
  }

  return response.text();
}

function rewriteForProjectPages(html) {
  return html
    .replaceAll('href="/', `href="${siteBase}/`)
    .replaceAll('src="/', `src="${siteBase}/`)
    .replaceAll('poster="/', `poster="${siteBase}/`)
    .replaceAll('content="/', `content="${siteBase}/`)
    .replaceAll('url("/', `url("${siteBase}/`)
    .replaceAll("url('/", `url('${siteBase}/`)
    .replaceAll("url(/", `url(${siteBase}/`)
    .replaceAll('href=\\u0022/', `href=\\u0022${siteBase}/`)
    .replaceAll('src=\\u0022/', `src=\\u0022${siteBase}/`)
    .replaceAll('url(\\u0022/', `url(\\u0022${siteBase}/`)
    .replaceAll("\\u0022/_next/", `\\u0022${siteBase}/_next/`)
    .replaceAll('\\"/_next/', `\\"${siteBase}/_next/`)
    .replaceAll('\\"/favicon.svg', `\\"${siteBase}/favicon.svg`)
    .replaceAll("\\u0022/hs-", `\\u0022${siteBase}/hs-`)
    .replaceAll("\\u0022/doctor-", `\\u0022${siteBase}/doctor-`)
    .replaceAll("\\u0022/hero-", `\\u0022${siteBase}/hero-`)
    .replaceAll("\\u0022/case-", `\\u0022${siteBase}/case-`)
    .replaceAll("\\u0022/treatments-", `\\u0022${siteBase}/treatments-`)
    .replaceAll("\\u0022/dental-", `\\u0022${siteBase}/dental-`)
    .replaceAll("\\u0022/consultorio-", `\\u0022${siteBase}/consultorio-`);
}

async function rewriteCssAssets(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        await rewriteCssAssets(entryPath);
        return;
      }

      if (!entry.name.endsWith(".css")) return;

      const css = await readFile(entryPath, "utf8");
      const rewritten = css
        .replaceAll('url("/', `url("${siteBase}/`)
        .replaceAll("url('/", `url('${siteBase}/`)
        .replaceAll("url(/", `url(${siteBase}/`);

      await writeFile(entryPath, rewritten);
    }),
  );
}

await mkdir(outputDir, { recursive: true });
await cp("dist/client", outputDir, { recursive: true });
await rewriteCssAssets(outputDir);

const html = rewriteForProjectPages(await renderHome());
await writeFile(join(outputDir, "index.html"), html);
await writeFile(join(outputDir, "404.html"), html);
await writeFile(join(outputDir, ".nojekyll"), "");

const rendered = await readFile(join(outputDir, "index.html"), "utf8");
if (!rendered.includes(`${siteBase}/_next/`)) {
  throw new Error("GitHub Pages asset base was not applied to the rendered HTML.");
}

console.log(`GitHub Pages export written to ${outputDir}`);
