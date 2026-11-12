import express from 'express'
import { authMiddleware } from './auth.js'
import { getNow, toIsoVN } from './clock.js'
import { getAssignmentsForStudent } from './service.js'

export function createApp({ now = getNow }: { now?: () => Date } = {}) {
  const app = express()
  app.disable('x-powered-by')
  app.use(authMiddleware)

  // Identity comes only from req.student (set by auth middleware); params/query/body/headers are ignored.
  app.get('/api/assignments', (req, res) => {
    const studentId = req.student.id
    const current = now()
    res.json({
      studentId,
      now: toIsoVN(current),
      assignments: getAssignmentsForStudent(studentId, current),
    })
  })

  app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' })
  })

  // Generic error response: never expose stack traces.
  app.use((_err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    res.status(500).json({ error: 'Internal error' })
  })

  return app
}
