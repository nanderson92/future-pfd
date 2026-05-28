import { expect, test } from "@playwright/test";

test("repo-root static page loads production app", async ({ page }) => {
  const runtimeErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(message.text());
  });
  page.on("pageerror", (error) => runtimeErrors.push(error.message));

  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Future Systems Atlas" })).toBeVisible();
  await expect(page.locator('script[type="module"]')).toHaveCount(1);
  await expect(page.locator('link[href="./dist/assets/index.css"]')).toHaveCount(1);

  await page.goto("/#map");
  await expect(page.locator(".atlas-canvas")).toBeVisible();
  await expect(page.locator(".map-stage-status")).toContainText("Full orbit");
  await expectCanvasDrawn(page);
  expect(runtimeErrors).toEqual([]);
});

async function expectCanvasDrawn(page) {
  await page.waitForTimeout(350);
  const metrics = await page.locator(".atlas-canvas").evaluate((canvas) => {
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    const sampleWidth = Math.max(1, Math.floor(width / 3));
    const sampleHeight = Math.max(1, Math.floor(height / 3));
    const startX = Math.floor((width - sampleWidth) / 2);
    const startY = Math.floor((height - sampleHeight) / 2);
    const data = ctx.getImageData(startX, startY, sampleWidth, sampleHeight).data;
    let visiblePixels = 0;
    for (let i = 0; i < data.length; i += 64) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a > 0 && r + g + b > 42) visiblePixels += 1;
    }
    return { width, height, visiblePixels };
  });
  expect(metrics.width).toBeGreaterThan(200);
  expect(metrics.height).toBeGreaterThan(200);
  expect(metrics.visiblePixels).toBeGreaterThan(120);
}
