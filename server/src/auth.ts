import type { NextFunction, Request, Response } from 'express'

export interface Student {
  id: string
}

declare module 'express-serve-static-core' {
  interface Request {
    student?: Student
  }
}

/** Simulated identity: the logged-in student is decided on the server only. */
export function getCurrentStudent(): Student {
  return { id: 'S01' }
}

export function authMiddleware(req: Request, _res: Response, next: NextFunction): void {
  req.student = getCurrentStudent()
  next()
}
