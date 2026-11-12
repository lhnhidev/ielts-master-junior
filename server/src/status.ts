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
