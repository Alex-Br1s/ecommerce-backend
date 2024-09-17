import { NextFunction, Request, Response } from 'express'

export function authenticateAdmin (req: Request, res: Response, next: NextFunction): void {
  if (req.user && req.user?.role === 'admin') next()
  else res.status(403).json({ message: 'Access denied. Admins only' })
}
