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
  expect(runtimeErrors).toEqual([]);
});
