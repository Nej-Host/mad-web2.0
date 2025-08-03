import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthenticatedUser {
  id: string
  email: string
  role: 'USER' | 'ADMIN'
}

export interface AuthRequest extends Request {
  user?: AuthenticatedUser
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    })
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      })
    }
    
    req.user = decoded as AuthenticatedUser
    next()
  })
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    })
  }

  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    })
  }

  next()
}

export function optionalAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    req.user = undefined
    return next()
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret', (err, decoded) => {
    if (err) {
      req.user = undefined
    } else {
      req.user = decoded as AuthenticatedUser
    }
    next()
  })
}
