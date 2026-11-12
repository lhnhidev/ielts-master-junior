import { ASSIGNMENTS } from './data.js'
import { computeStatus, type AssignmentStatus } from './status.js'

export interface AssignmentView {
  id: string
  title: string
  dueAt: string
  submittedAt: string | null
  status: AssignmentStatus
  late: boolean
}

export function getAssignmentsForStudent(studentId: string, now: Date): AssignmentView[] {
  return ASSIGNMENTS.filter((a) => a.studentId === studentId).map((a) => {
    const { status, late } = computeStatus(a, now)
    return { id: a.id, title: a.title, dueAt: a.dueAt, submittedAt: a.submittedAt, status, late }
  })
}
