export type AssignmentStatus = 'submitted' | 'not_submitted' | 'overdue'

export interface StatusInput {
  dueAt: string
  submittedAt: string | null
}

export function computeStatus(
  a: StatusInput,
  now: Date,
): { status: AssignmentStatus; late: boolean } {
  const due = new Date(a.dueAt).getTime()
  if (a.submittedAt !== null) {
    return { status: 'submitted', late: new Date(a.submittedAt).getTime() > due }
  }
  return { status: now.getTime() > due ? 'overdue' : 'not_submitted', late: false }
}

export interface DayCounts {
  daysLeft: number | null
  daysOverdue: number | null
  daysLate: number | null
}

const DAY_MS = 86_400_000

/** Full 24h periods (floor); 0 means under one day. Only the field matching the status is set. */
export function computeDayCounts(a: StatusInput, now: Date): DayCounts {
  const due = new Date(a.dueAt).getTime()
  const full = (ms: number) => Math.floor(ms / DAY_MS)
  const counts: DayCounts = { daysLeft: null, daysOverdue: null, daysLate: null }
  if (a.submittedAt !== null) {
    const submitted = new Date(a.submittedAt).getTime()
    if (submitted > due) counts.daysLate = full(submitted - due)
  } else if (now.getTime() > due) {
    counts.daysOverdue = full(now.getTime() - due)
  } else {
    counts.daysLeft = full(due - now.getTime())
  }
  return counts
}
