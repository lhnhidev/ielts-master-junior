export type AssignmentStatus = 'submitted' | 'not_submitted' | 'overdue'

export interface Assignment {
  id: string
  title: string
  dueAt: string
  submittedAt: string | null
  status: AssignmentStatus
  late: boolean
}

export interface AssignmentsResponse {
  studentId: string
  now: string
  assignments: Assignment[]
}

export async function fetchAssignments(signal?: AbortSignal): Promise<AssignmentsResponse> {
  const res = await fetch('/api/assignments', { signal })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return (await res.json()) as AssignmentsResponse
}
