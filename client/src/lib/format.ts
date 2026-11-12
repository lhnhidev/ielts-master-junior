import type { Assignment } from './api'

const TZ = 'Asia/Ho_Chi_Minh'

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

function daysText(prefix: string, days: number | null): string {
  return days === null ? '' : days < 1 ? `${prefix} dưới 1 ngày` : `${prefix} ${days} ngày`
}

export type BadgeKind = 'done' | 'todo' | 'overdue' | 'late'

export interface AssignmentDescription {
  badges: BadgeKind[]
  info: string
}

export function describeAssignment(a: Assignment): AssignmentDescription {
  if (a.status === 'submitted') {
    if (!a.late) return { badges: ['done'], info: '' }
    return { badges: ['done', 'late'], info: daysText('Trễ', a.daysLate) }
  }
  if (a.status === 'overdue') {
    return { badges: ['overdue'], info: daysText('Quá hạn', a.daysOverdue) }
  }
  return { badges: ['todo'], info: daysText('Còn', a.daysLeft) }
}
