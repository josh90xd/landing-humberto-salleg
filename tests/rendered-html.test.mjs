import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
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
}

test("server-renders the premium personal landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Dr\. Humberto Salleg/);
  assert.match(html, /Ortodoncia Premium/);
  assert.match(html, /Asistente Virtual/);
  assert.match(html, /hsalleg14@gmail\.com/);
  assert.match(html, /Centro de Estudios Superiores de Ortodoncia/);
  assert.match(html, /American Association of Orthodontics/);
  assert.match(html, /Casos clinicos preparados/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("site source keeps real-content guardrails", async () => {
  const [page, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /No se muestran resultados ficticios/);
  assert.match(page, /testimonios verificados/);
  assert.match(page, /Fotografia editorial del doctor pendiente/);
  assert.match(layout, /lang="es"/);
  assert.doesNotMatch(page, /pacientes atendidos|años de experiencia/i);
});
