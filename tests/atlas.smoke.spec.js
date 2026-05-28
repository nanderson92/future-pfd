import { expect, test } from "@playwright/test";

test("Future Systems Atlas smoke flow", async ({ page }) => {
  const runtimeErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(message.text());
  });
  page.on("pageerror", (error) => runtimeErrors.push(error.message));

  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Future Systems Atlas" })).toBeVisible();

  await page.locator(".landing-copy .button.primary").click();
  await expect(page.locator(".atlas-canvas")).toBeVisible();
  await expect(page.locator(".map-stage-status")).toContainText("Full orbit");
  await expectCanvasDrawn(page);

  await page.goto("/#map");
  await expect(page.locator(".atlas-canvas")).toBeVisible();
  await expectCanvasDrawn(page);
  for (const sector of ["energy", "carbon", "water", "materials", "manufacturing", "cities", "space"]) {
    await page.locator(`.sector-list button[data-sector="${sector}"]`).click();
    await expect(page.locator(".map-stage-status")).toContainText("focus");
  }
  await page.locator(".map-control-panel button", { hasText: "Full Orbit" }).click();
  await expect(page.locator(".map-stage-status")).toContainText("Full orbit");

  await page.locator(".map-left-panel .map-search input").fill("fusion");
  await expect(page.locator(".map-left-panel .map-search-status")).toContainText("matches");

  await page.locator(".map-left-panel .map-suggestions button", { hasText: "Tokamak fusion" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();

  await page.locator(".map-left-panel .map-search input").fill("DAC");
  await expect(page.locator(".map-left-panel .map-suggestions")).toContainText("DAC");
  await page.locator(".map-left-panel .map-suggestions button", { hasText: "Solid-sorbent DAC" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");

  await page.goto("/#cases");
  await expect(page.locator(".case-study")).toHaveCount(6);

  await page.goto("/#index");
  await page.locator(".index-controls .search-field input").fill("fusion");
  await expect(page.locator(".results-bar")).toContainText("results");

  await page.goto("/#sources");
  await expect(page.locator(".results-bar")).toContainText("244 / 244");

  await page.goto("/#about");
  await expect(page.getByText("Email Nathan")).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#map");
  await expect(page.locator(".atlas-canvas")).toBeVisible();
  await expect(page.locator(".mobile-map-console")).toBeVisible();
  const mobileConsoleBox = await page.locator(".mobile-map-console").boundingBox();
  expect(mobileConsoleBox.height).toBeLessThanOrEqual(230);

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
