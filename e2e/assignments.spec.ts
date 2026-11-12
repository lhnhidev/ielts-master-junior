import { expect, test } from '@playwright/test'

test('handles error and empty states, then shows S01 assignments and saves screenshot', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })

  // Error state: API fails -> Alert + retry button.
  await page.route('**/api/assignments', (route) =>
    route.fulfill({ status: 500, contentType: 'application/json', body: '{"error":"Internal error"}' }),
  )
  await page.goto('/')
  await expect(page.getByText('Chưa tải được bài tập của bạn')).toBeVisible()
  const retry = page.getByRole('button', { name: 'Thử lại' })
  await expect(retry).toBeVisible()

  // Empty state: retry succeeds with no assignments.
  await page.unroute('**/api/assignments')
  await page.route('**/api/assignments', (route) =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ studentId: 'S01', now: '2026-11-11T09:00:00+07:00', assignments: [] }),
    }),
  )
  await retry.click()
  await expect(page.getByText('Bạn chưa có bài tập nào')).toBeVisible()

  // Loaded state: real API.
  await page.unroute('**/api/assignments')
  await page.reload()

  await expect(page.getByRole('heading', { level: 1, name: 'Bài tập của S01' })).toBeVisible()

  const rows = page.locator('table tbody tr')
  await expect(rows).toHaveCount(4)

  const expected = [
    ['A01', 'Foundation U1 – Reading', 'Chưa nộp', 'Còn 2 ngày'],
    ['A02', 'Foundation U2 – Listening', 'Quá hạn', 'Quá hạn 1 ngày'],
    ['A03', 'Foundation U3 – Writing', 'Đã nộp', '10/11/2026 20:00'],
    ['A04', 'Foundation U4 – Speaking', 'Đã nộp', 'Nộp trễ', 'Trễ 1 ngày', '10/11/2026 12:00'],
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
  await expect(rows.nth(3)).toHaveCSS('opacity', '1') // last staggered row finished fading in
  await page.screenshot({ path: 'docs/screenshot.png', fullPage: true })
})
