import { expect, test } from '@playwright/test'

test('shows S01 assignments with correct statuses and saves screenshot', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/')

  const rows = page.locator('table tbody tr')
  await expect(rows).toHaveCount(4)

  const expected = [
    ['Foundation U1 – Reading', 'Chưa nộp', 'Còn 2 ngày'],
    ['Foundation U2 – Listening', 'Quá hạn'],
    ['Foundation U3 – Writing', 'Đã nộp'],
    ['Foundation U4 – Speaking', 'Đã nộp', 'Nộp trễ'],
  ]
  for (const [i, texts] of expected.entries()) {
    for (const t of texts) await expect(rows.nth(i)).toContainText(t)
  }
  await expect(rows.nth(0)).not.toContainText('Quá hạn')
  await expect(rows.nth(2)).not.toContainText('Nộp trễ')

  // Only S01's single "Foundation U1 – Reading" (S02's B01 must be absent).
  await expect(page.locator('table').getByText('Foundation U1 – Reading')).toHaveCount(1)

  // Animations are disabled via reducedMotion (see playwright.config.ts), so the screenshot is stable.
  await expect(rows.nth(3).getByText('Nộp trễ')).toBeVisible()
  await page.screenshot({ path: 'docs/screenshot.png', fullPage: true })
})
