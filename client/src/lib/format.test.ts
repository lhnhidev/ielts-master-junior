import { describe, expect, it } from 'vitest'
import type { Assignment } from './api'
import { describeAssignment, formatDateTime } from './format'

const NOW = '2026-11-11T09:00:00+07:00'

const a01: Assignment = {
  id: 'A01', title: 'Foundation U1 – Reading', dueAt: '2026-11-13T23:59:00+07:00',
  submittedAt: null, status: 'not_submitted', late: false,
}
const a02: Assignment = {
  id: 'A02', title: 'Foundation U2 – Listening', dueAt: '2026-11-09T23:59:00+07:00',
  submittedAt: null, status: 'overdue', late: false,
}
const a03: Assignment = {
  id: 'A03', title: 'Foundation U3 – Writing', dueAt: '2026-11-10T23:59:00+07:00',
  submittedAt: '2026-11-10T20:00:00+07:00', status: 'submitted', late: false,
}
const a04: Assignment = {
  id: 'A04', title: 'Foundation U4 – Speaking', dueAt: '2026-11-08T23:59:00+07:00',
  submittedAt: '2026-11-10T12:00:00+07:00', status: 'submitted', late: true,
}

describe('formatDateTime', () => {
  it('formats dd/MM/yyyy HH:mm in Asia/Ho_Chi_Minh, 24h', () => {
    expect(formatDateTime(NOW)).toBe('11/11/2026 09:00')
    expect(formatDateTime('2026-11-13T23:59:00+07:00')).toBe('13/11/2026 23:59')
    expect(formatDateTime('2026-11-10T13:00:00Z')).toBe('10/11/2026 20:00')
  })
})

describe('describeAssignment', () => {
  it('A01 not submitted', () => {
    expect(describeAssignment(a01, NOW)).toEqual({ badges: ['todo'], info: 'Còn 2 ngày' })
  })
  it('A02 overdue', () => {
    expect(describeAssignment(a02, NOW)).toEqual({ badges: ['overdue'], info: 'Quá hạn 1 ngày' })
  })
  it('A03 submitted on time', () => {
    expect(describeAssignment(a03, NOW)).toEqual({
      badges: ['done'], info: 'Nộp lúc 10/11/2026 20:00',
    })
  })
  it('A04 submitted late', () => {
    expect(describeAssignment(a04, NOW)).toEqual({
      badges: ['done', 'late'], info: 'Nộp lúc 10/11/2026 12:00 · trễ 1 ngày',
    })
  })
  it('uses "dưới 1 ngày" under a day', () => {
    expect(describeAssignment({ ...a01, dueAt: '2026-11-11T20:00:00+07:00' }, NOW).info)
      .toBe('Còn dưới 1 ngày')
    expect(describeAssignment({ ...a02, dueAt: '2026-11-10T20:00:00+07:00' }, NOW).info)
      .toBe('Quá hạn dưới 1 ngày')
    expect(describeAssignment({ ...a04, dueAt: '2026-11-10T20:00:00+07:00' }, NOW).info)
      .toBe('Nộp lúc 10/11/2026 12:00 · trễ dưới 1 ngày')
  })
})
