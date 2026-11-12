import { describe, expect, it } from 'vitest'
import { getNow, SIMULATED_NOW_ISO, toIsoVN } from '../src/clock.js'

describe('clock', () => {
  it('getNow returns the fixed simulated time', () => {
    expect(getNow().toISOString()).toBe('2026-11-11T02:00:00.000Z')
  })

  it('toIsoVN formats with +07:00 offset and no milliseconds', () => {
    expect(toIsoVN(getNow())).toBe(SIMULATED_NOW_ISO)
    expect(toIsoVN(new Date('2026-11-10T17:30:00.123Z'))).toBe('2026-11-11T00:30:00+07:00')
  })
})
