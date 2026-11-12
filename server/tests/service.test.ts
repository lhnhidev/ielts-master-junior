import { describe, expect, it } from 'vitest'
import { getNow } from '../src/clock.js'
import { getAssignmentsForStudent } from '../src/service.js'

const now = getNow()
const ids = (studentId: string) => getAssignmentsForStudent(studentId, now).map((a) => a.id)

describe('getAssignmentsForStudent', () => {
  it('S01 gets exactly A01..A04', () => {
    expect(ids('S01')).toEqual(['A01', 'A02', 'A03', 'A04'])
  })
  it('S02 gets exactly B01', () => {
    expect(ids('S02')).toEqual(['B01'])
  })
  it('unknown student gets []', () => {
    expect(getAssignmentsForStudent('S99', now)).toEqual([])
  })
  it('attaches day counts', () => {
    const rows = getAssignmentsForStudent('S01', now)
    expect(rows.map((a) => [a.daysLeft, a.daysOverdue, a.daysLate])).toEqual([
      [2, null, null],
      [null, 1, null],
      [null, null, null],
      [null, null, 1],
    ])
  })
})
