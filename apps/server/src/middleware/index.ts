import { Request, Response, NextFunction } from 'express'

export interface RequestWithUser extends Request {
  user?: {
    id: string
    email: string
    role: 'USER' | 'ADMIN'
  }
}

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

export const errorHandler = (error: Error & { code?: string; kind?: string }, req: Request, res: Response) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = error.message

  // Mongoose bad ObjectId
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    statusCode = 404
    message = 'Resource not found'
  }

  // Prisma errors
  if (error.code === 'P2002') {
    statusCode = 400
    message = 'Duplicate field value entered'
  }

  if (error.code === 'P2025') {
    statusCode = 404
    message = 'Record not found'
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  })
}
