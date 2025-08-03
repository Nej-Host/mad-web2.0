import { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'

export interface ValidatedRequest extends Request {
  validatedBody?: Record<string, unknown>
  validatedQuery?: Record<string, unknown>
  validatedParams?: Record<string, unknown>
}

export function validateRequest(schemas: {
  body?: ZodSchema
  query?: ZodSchema
  params?: ZodSchema
}) {
  return (req: ValidatedRequest, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.validatedBody = schemas.body.parse(req.body)
      }
      
      if (schemas.query) {
        req.validatedQuery = schemas.query.parse(req.query)
      }
      
      if (schemas.params) {
        req.validatedParams = schemas.params.parse(req.params)
      }
      
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        })
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        })
      }
    }
  }
}
