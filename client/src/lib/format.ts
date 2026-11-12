import type { Assignment } from './api'

const TZ = 'Asia/Ho_Chi_Minh'
const DAY_MS = 24 * 60 * 60 * 1000

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: TZ,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

/** Formats an ISO string as dd/MM/yyyy HH:mm in Asia/Ho_Chi_Minh. */
export function formatDateTime(iso: string): string {
  const p: Record<string, string> = {}
  for (const part of formatter.formatToParts(new Date(iso))) p[part.type] = part.value
  return `${p.day}/${p.month}/${p.year} ${p.hour}:${p.minute}`
}

function wholeDays(ms: number): number {
  return Math.floor(ms / DAY_MS)
}

function daysText(prefix: string, ms: number, underOne: string): string {
  const n = wholeDays(ms)
  return n < 1 ? `${prefix} ${underOne}` : `${prefix} ${n} ngày`
}

export type BadgeKind = 'done' | 'todo' | 'overdue' | 'late'

export interface AssignmentDescription {
  badges: BadgeKind[]
  info: string
}

export function describeAssignment(a: Assignment, now: string): AssignmentDescription {
  const nowMs = new Date(now).getTime()
  const dueMs = new Date(a.dueAt).getTime()

  if (a.status === 'submitted' && a.submittedAt) {
    if (!a.late) return { badges: ['done'], info: '' }
    const info = daysText('Trễ', new Date(a.submittedAt).getTime() - dueMs, 'dưới 1 ngày')
    return { badges: ['done', 'late'], info }
  }
  if (a.status === 'overdue') {
    return { badges: ['overdue'], info: daysText('Quá hạn', nowMs - dueMs, 'dưới 1 ngày') }
  }
  return { badges: ['todo'], info: daysText('Còn', dueMs - nowMs, 'dưới 1 ngày') }
}
