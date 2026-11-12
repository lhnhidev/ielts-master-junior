import { describe, expect, it } from 'vitest'
import { computeStatus } from '../src/status.js'

const now = new Date('2026-11-11T09:00:00+07:00')

describe('computeStatus', () => {
  it('not submitted, before due -> not_submitted', () => {
    expect(computeStatus({ dueAt: '2026-11-13T23:59:00+07:00', submittedAt: null }, now)).toEqual({ status: 'not_submitted', late: false })
  })
  it('not submitted, after due -> overdue', () => {
    expect(computeStatus({ dueAt: '2026-11-09T23:59:00+07:00', submittedAt: null }, now)).toEqual({ status: 'overdue', late: false })
  })
  it('submitted on time -> submitted, not late', () => {
    expect(computeStatus({ dueAt: '2026-11-10T23:59:00+07:00', submittedAt: '2026-11-10T20:00:00+07:00' }, now)).toEqual({ status: 'submitted', late: false })
  })
  it('submitted after due -> submitted, late', () => {
    expect(computeStatus({ dueAt: '2026-11-08T23:59:00+07:00', submittedAt: '2026-11-10T12:00:00+07:00' }, now)).toEqual({ status: 'submitted', late: true })
  })
  it('now == due -> not_submitted', () => {
    expect(computeStatus({ dueAt: '2026-11-11T09:00:00+07:00', submittedAt: null }, now).status).toBe('not_submitted')
  })
  it('submittedAt == dueAt -> not late', () => {
    const t = '2026-11-10T23:59:00+07:00'
    expect(computeStatus({ dueAt: t, submittedAt: t }, now)).toEqual({ status: 'submitted', late: false })
  })
})
