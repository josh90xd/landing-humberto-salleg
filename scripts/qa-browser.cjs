/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require("C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const fs = require("node:fs");
const path = require("node:path");

(async () => {
  const outDir = path.resolve("tmp/qa");
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const viewport of [
    { name: "desktop", width: 1440, height: 1100 },
    { name: "mobile", width: 390, height: 900 },
  ]) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
    });
    const consoleErrors = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(outDir, `${viewport.name}.png`),
      fullPage: false,
    });

    const title = await page.title();
    const h1 = await page.locator("h1").innerText();
    await page.locator(".primary-button").filter({ visible: true }).first().click();
    await page.waitForTimeout(300);
    const contactVisible = await page.locator("#contacto").isVisible();
    await page.locator(".chat-toggle").click();
    const chatVisible = await page.locator(".chat-panel").isVisible();
    const whatsappVisible = await page.locator(".whatsapp-float").isVisible();
    await page.locator('input[name="name"]').fill("QA Test");
    await page.locator('input[name="email"]').fill("qa@example.com");
    await page.locator('textarea[name="message"]').fill("Revision de formulario");
    await page.locator(".contact-form button").click();
    const formStillVisible = await page.locator(".contact-form").isVisible();
    let drawerVisible = null;

    if (viewport.name === "mobile") {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      await page.locator(".menu-button").click();
      drawerVisible = await page.locator(".mobile-drawer.open").isVisible();
      await page.locator('.mobile-drawer a[href="#tratamientos"]').click();
      await page.waitForTimeout(300);
    }

    results.push({
      viewport: viewport.name,
      title,
      h1,
      contactVisible,
      chatVisible,
      whatsappVisible,
      formStillVisible,
      drawerVisible,
      consoleErrors,
    });

    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
})();
