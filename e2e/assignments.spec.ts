import { expect, test } from '@playwright/test'

test('shows S01 assignments with correct statuses and saves screenshot', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1, name: 'Bài tập của S01' })).toBeVisible()

  const rows = page.locator('table tbody tr')
  await expect(rows).toHaveCount(4)

  const expected = [
    ['A01', 'Foundation U1 – Reading', 'Chưa nộp', 'Còn 2 ngày'],
    ['A02', 'Foundation U2 – Listening', 'Quá hạn'],
    ['A03', 'Foundation U3 – Writing', 'Đã nộp', '10/11/2026 20:00'],
    ['A04', 'Foundation U4 – Speaking', 'Đã nộp', 'Nộp trễ', '10/11/2026 12:00'],
  ]
  for (const [i, texts] of expected.entries()) {
    for (const t of texts) await expect(rows.nth(i)).toContainText(t)
  }
  // Submitted-at column (4th cell): "—" when not submitted.
  const submittedAt = rows.locator('td:nth-child(4)')
  await expect(submittedAt).toHaveText(['—', '—', '10/11/2026 20:00', '10/11/2026 12:00'])
  await expect(page.locator('table')).not.toContainText('B01')
  await expect(rows.nth(0)).not.toContainText('Quá hạn')
  await expect(rows.nth(2)).not.toContainText('Nộp trễ')

  // Only S01's single "Foundation U1 – Reading" (S02's B01 must be absent).
  await expect(page.locator('table').getByText('Foundation U1 – Reading')).toHaveCount(1)

  // Animations are disabled via reducedMotion (see playwright.config.ts), so the screenshot is stable.
  await expect(rows.nth(3).getByText('Nộp trễ')).toBeVisible()
  await page.screenshot({ path: 'docs/screenshot.png', fullPage: true })
})
