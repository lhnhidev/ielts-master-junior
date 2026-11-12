export const SIMULATED_NOW_ISO = '2026-11-11T09:00:00+07:00'

/** Fixed simulated time. Never use `new Date()` for the answer. */
export function getNow(): Date {
  return new Date(SIMULATED_NOW_ISO)
}

/** ISO string with explicit +07:00 offset (no milliseconds), e.g. 2026-11-11T09:00:00+07:00. */
export function toIsoVN(date: Date): string {
  return new Date(date.getTime() + 7 * 3_600_000).toISOString().replace(/\.\d{3}Z$/, '+07:00')
}
