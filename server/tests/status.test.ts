import { describe, expect, it } from 'vitest'
import { computeDayCounts, computeStatus } from '../src/status.js'

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

describe('computeDayCounts', () => {
  const nulls = { daysLeft: null, daysOverdue: null, daysLate: null }
  it('not submitted: daysLeft (2.6 days -> 2)', () => {
    expect(computeDayCounts({ dueAt: '2026-11-13T23:59:00+07:00', submittedAt: null }, now)).toEqual({ ...nulls, daysLeft: 2 })
  })
  it('overdue: daysOverdue (1.4 days -> 1)', () => {
    expect(computeDayCounts({ dueAt: '2026-11-09T23:59:00+07:00', submittedAt: null }, now)).toEqual({ ...nulls, daysOverdue: 1 })
  })
  it('submitted on time: all null', () => {
    expect(computeDayCounts({ dueAt: '2026-11-10T23:59:00+07:00', submittedAt: '2026-11-10T20:00:00+07:00' }, now)).toEqual(nulls)
  })
  it('submitted late: daysLate (1.5 days -> 1)', () => {
    expect(computeDayCounts({ dueAt: '2026-11-08T23:59:00+07:00', submittedAt: '2026-11-10T12:00:00+07:00' }, now)).toEqual({ ...nulls, daysLate: 1 })
  })
  it('under one day -> 0', () => {
    expect(computeDayCounts({ dueAt: '2026-11-11T20:00:00+07:00', submittedAt: null }, now).daysLeft).toBe(0)
    expect(computeDayCounts({ dueAt: '2026-11-10T20:00:00+07:00', submittedAt: null }, now).daysOverdue).toBe(0)
    expect(computeDayCounts({ dueAt: '2026-11-10T20:00:00+07:00', submittedAt: '2026-11-10T21:00:00+07:00' }, now).daysLate).toBe(0)
  })
  it('now == due -> daysLeft 0; submittedAt == due -> all null', () => {
    expect(computeDayCounts({ dueAt: '2026-11-11T09:00:00+07:00', submittedAt: null }, now)).toEqual({ ...nulls, daysLeft: 0 })
    const t = '2026-11-10T23:59:00+07:00'
    expect(computeDayCounts({ dueAt: t, submittedAt: t }, now)).toEqual(nulls)
  })
})
