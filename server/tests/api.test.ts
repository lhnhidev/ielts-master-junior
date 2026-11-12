import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { createApp } from '../src/app.js'

const app = createApp()

type Row = { id: string; status: string; late: boolean }

describe('GET /api/assignments', () => {
  it('returns exactly S01 assignments A01..A04 with expected status', async () => {
    const res = await request(app).get('/api/assignments').expect(200)
    expect(res.body.studentId).toBe('S01')
    expect(res.body.now).toBe('2026-11-11T09:00:00+07:00')
    expect(res.body.assignments.map((a: Row) => [a.id, a.status, a.late])).toEqual([
      ['A01', 'not_submitted', false],
      ['A02', 'overdue', false],
      ['A03', 'submitted', false],
      ['A04', 'submitted', true],
    ])
    expect(Object.keys(res.body.assignments[0]).sort()).toEqual([
      'daysLate', 'daysLeft', 'daysOverdue', 'dueAt', 'id', 'late', 'status', 'submittedAt', 'title',
    ])
  })

  it('ignores studentId in query, body and headers', async () => {
    const base = await request(app).get('/api/assignments').expect(200)
    const attempts = [
      await request(app).get('/api/assignments?studentId=S02'),
      await request(app).get('/api/assignments').set('x-student-id', 'S02').set('studentId', 'S02'),
      await request(app).get('/api/assignments').send({ studentId: 'S02' }),
    ]
    for (const r of attempts) {
      expect(r.status).toBe(200)
      expect(r.body).toEqual(base.body)
      expect(r.body.assignments.some((a: Row) => a.id === 'B01')).toBe(false)
    }
  })

  it('response contains no data of other students', async () => {
    const res = await request(app).get('/api/assignments?studentId=S02').expect(200)
    expect(res.text).not.toContain('B01')
    expect(res.text).not.toContain('S02')
  })

  it('uses injected now', async () => {
    const later = createApp({ now: () => new Date('2026-11-14T00:00:00+07:00') })
    const res = await request(later).get('/api/assignments').expect(200)
    expect(res.body.assignments[0].status).toBe('overdue')
  })

  it('unknown route -> 404 JSON, no x-powered-by', async () => {
    const res = await request(app).get('/nope').expect(404)
    expect(res.body).toEqual({ error: 'Not found' })
    expect(res.headers['x-powered-by']).toBeUndefined()
  })
})
