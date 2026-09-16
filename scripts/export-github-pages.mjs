import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
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
    .replaceAll("url('/", `url('${siteBase}/`);
}

await mkdir(outputDir, { recursive: true });
await cp("dist/client", outputDir, { recursive: true });

const html = rewriteForProjectPages(await renderHome());
await writeFile(join(outputDir, "index.html"), html);
await writeFile(join(outputDir, "404.html"), html);
await writeFile(join(outputDir, ".nojekyll"), "");

const rendered = await readFile(join(outputDir, "index.html"), "utf8");
if (!rendered.includes(`${siteBase}/_next/`)) {
  throw new Error("GitHub Pages asset base was not applied to the rendered HTML.");
}

console.log(`GitHub Pages export written to ${outputDir}`);
