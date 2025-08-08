import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Demo users for testing
const demoUsers = [
  {
    id: 'demo-admin-001',
    email: 'admin@madzone.cz',
    password: 'admin123', // In real app, this would be hashed
    firstName: 'Admin',
    lastName: 'Madzone',
    role: 'admin' as const
  },
  {
    id: 'demo-editor-001',
    email: 'editor@madzone.cz',
    password: 'editor123',
    firstName: 'Editor',
    lastName: 'Madzone',
    role: 'editor' as const
  }
]

// Helper function to generate JWT token
const generateToken = (user: any) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  }
  
  return jwt.sign(payload, process.env.JWT_SECRET || 'madzone-secret', {
    expiresIn: '24h'
  })
}

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email a heslo jsou povinné'
      })
    }

    // For demo purposes, use demo users
    const user = demoUsers.find(u => u.email === email)
    
    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Neplatné přihlašovací údaje'
      })
    }

    // Generate token
    const token = generateToken(user)

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user
    
    res.json({
      success: true,
      token,
      user: {
        ...userWithoutPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      message: 'Přihlášení úspěšné'
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Chyba serveru při přihlášení'
    })
  }
})

// Register endpoint (simplified for demo)
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'Všechna pole jsou povinná'
      })
    }

    // Check if user already exists
    const existingUser = demoUsers.find(u => u.email === email)
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Uživatel s tímto emailem již existuje'
      })
    }

    // Create new user (in memory for demo)
    const newUser = {
      id: `demo-user-${Date.now()}`,
      email,
      password, // In real app, this would be hashed
      firstName,
      lastName,
      role: 'editor' as const
    }

    demoUsers.push(newUser)

    // Generate token
    const token = generateToken(newUser)

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser
    
    res.status(201).json({
      success: true,
      token,
      user: {
        ...userWithoutPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      message: 'Registrace úspěšná'
    })

  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({
      success: false,
      message: 'Chyba serveru při registraci'
    })
  }
})

// Get current user endpoint
router.get('/me', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token nenalezen'
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'madzone-secret') as any
    
    // Find user
    const user = demoUsers.find(u => u.id === decoded.id)
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Uživatel nenalezen'
      })
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user
    
    res.json({
      ...userWithoutPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Get me error:', error)
    res.status(401).json({
      success: false,
      message: 'Neplatný token'
    })
  }
})

// Logout endpoint
router.post('/logout', (req, res) => {
  // In a real app, you might want to blacklist the token
  res.json({
    success: true,
    message: 'Odhlášení úspěšné'
  })
})

// Verify token endpoint
router.post('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({
        valid: false,
        message: 'Token nenalezen'
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'madzone-secret') as any
    
    // Find user
    const user = demoUsers.find(u => u.id === decoded.id)
    
    if (!user) {
      return res.json({
        valid: false,
        message: 'Uživatel nenalezen'
      })
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user
    
    res.json({
      valid: true,
      user: {
        ...userWithoutPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Verify token error:', error)
    res.json({
      valid: false,
      message: 'Neplatný token'
    })
  }
})

// Refresh token endpoint
router.post('/refresh', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token nenalezen'
      })
    }

    // Verify current token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'madzone-secret') as any
    
    // Find user
    const user = demoUsers.find(u => u.id === decoded.id)
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Uživatel nenalezen'
      })
    }

    // Generate new token
    const newToken = generateToken(user)

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user
    
    res.json({
      success: true,
      token: newToken,
      user: {
        ...userWithoutPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      message: 'Token obnoven'
    })

  } catch (error) {
    console.error('Refresh token error:', error)
    res.status(401).json({
      success: false,
      message: 'Neplatný token'
    })
  }
})

export default router
