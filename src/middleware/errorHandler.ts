import type { Request, Response, NextFunction } from 'express'

const ERROR_HANDLERS: Record<string, (res: Response, error: Error) => void> = {
  CastError: (res: Response): void => {
    res.status(400).send({ error: 'id used is malformed' })
  },

  JsonWebTokenError: (res: Response): void => {
    res.status(401).json({ error: 'token missing or invalid' })
  },

  TokenExpirerError: (res: Response): void => {
    res.status(401).json({ error: 'token expired' })
  },

  SyntaxError: (res: Response): void => {
    res.status(401).json({ error: 'token invalid' })
  },
  AuthError: (res: Response): void => {
    res.status(401).json({ error: 'Incorrect email or password' })
  },

  defaultError: (res: Response, error: Error): void => {
    console.error(error.name)
    console.error(error)
    res.status(500).end()
  }
}

export const handlerError = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const handler = ERROR_HANDLERS[error.name] ?? ERROR_HANDLERS.defaultError
  handler(res, error)
}
