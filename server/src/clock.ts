export const SIMULATED_NOW_ISO = '2026-11-11T09:00:00+07:00'

/** Fixed simulated time. Never use `new Date()` for the answer. */
export function getNow(): Date {
  return new Date(SIMULATED_NOW_ISO)
}
