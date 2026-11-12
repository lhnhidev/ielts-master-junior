import { describe, expect, it } from 'vitest'
import type { Assignment } from './api'
import { describeAssignment, formatDateTime } from './format'

const NOW = '2026-11-11T09:00:00+07:00'
const none = { daysLeft: null, daysOverdue: null, daysLate: null }

const a01: Assignment = {
  id: 'A01', title: 'Foundation U1 – Reading', dueAt: '2026-11-13T23:59:00+07:00',
  submittedAt: null, status: 'not_submitted', late: false, ...none, daysLeft: 2,
}
const a02: Assignment = {
  id: 'A02', title: 'Foundation U2 – Listening', dueAt: '2026-11-09T23:59:00+07:00',
  submittedAt: null, status: 'overdue', late: false, ...none, daysOverdue: 1,
}
const a03: Assignment = {
  id: 'A03', title: 'Foundation U3 – Writing', dueAt: '2026-11-10T23:59:00+07:00',
  submittedAt: '2026-11-10T20:00:00+07:00', status: 'submitted', late: false, ...none,
}
const a04: Assignment = {
  id: 'A04', title: 'Foundation U4 – Speaking', dueAt: '2026-11-08T23:59:00+07:00',
  submittedAt: '2026-11-10T12:00:00+07:00', status: 'submitted', late: true, ...none, daysLate: 1,
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
    expect(describeAssignment(a01)).toEqual({ badges: ['todo'], info: 'Còn 2 ngày' })
  })
  it('A02 overdue', () => {
    expect(describeAssignment(a02)).toEqual({ badges: ['overdue'], info: 'Quá hạn 1 ngày' })
  })
  it('A03 submitted on time', () => {
    expect(describeAssignment(a03)).toEqual({ badges: ['done'], info: '' })
  })
  it('A04 submitted late', () => {
    expect(describeAssignment(a04)).toEqual({ badges: ['done', 'late'], info: 'Trễ 1 ngày' })
  })
  it('uses "dưới 1 ngày" when the server count is 0', () => {
    expect(describeAssignment({ ...a01, daysLeft: 0 }).info).toBe('Còn dưới 1 ngày')
    expect(describeAssignment({ ...a02, daysOverdue: 0 }).info).toBe('Quá hạn dưới 1 ngày')
    expect(describeAssignment({ ...a04, daysLate: 0 }).info).toBe('Trễ dưới 1 ngày')
  })
})
