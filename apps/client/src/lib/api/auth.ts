// Authentication API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'user' | 'admin' | 'editor'
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  success: boolean
  token?: string
  user?: User
  message?: string
}

// Helper function for API requests
async function authRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Auth API request failed:', error)
    throw error
  }
}

// Auth API
export const authApi = {
  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return authRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  },

  // Register user
  async register(userData: RegisterData): Promise<AuthResponse> {
    return authRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },

  // Logout user
  async logout(): Promise<{ success: boolean }> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
    
    const result = await authRequest<{ success: boolean }>('/auth/logout', {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })

    // Clear local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    }

    return result
  },

  // Get current user
  async getCurrentUser(): Promise<User> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
    
    if (!token) {
      throw new Error('No auth token found')
    }

    return authRequest<User>('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  // Refresh token
  async refreshToken(): Promise<AuthResponse> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
    
    if (!token) {
      throw new Error('No auth token found')
    }

    return authRequest<AuthResponse>('/auth/refresh', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  // Verify token
  async verifyToken(token: string): Promise<{ valid: boolean; user?: User }> {
    return authRequest<{ valid: boolean; user?: User }>('/auth/verify', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
  },
}

// Auth utilities
export const authUtils = {
  // Save auth data to localStorage
  saveAuthData(token: string, user: User) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user_data', JSON.stringify(user))
    }
  },

  // Get auth data from localStorage
  getAuthData(): { token: string | null; user: User | null } {
    if (typeof window === 'undefined') {
      return { token: null, user: null }
    }

    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user_data')
    
    return {
      token,
      user: userData ? JSON.parse(userData) : null,
    }
  },

  // Clear auth data
  clearAuthData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const { token } = this.getAuthData()
    return !!token
  },

  // Check if user has specific role
  hasRole(requiredRole: string): boolean {
    const { user } = this.getAuthData()
    if (!user) return false
    
    const roleHierarchy = {
      'user': 0,
      'editor': 1,
      'admin': 2
    }
    
    const userLevel = roleHierarchy[user.role as keyof typeof roleHierarchy] || 0
    const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0
    
    return userLevel >= requiredLevel
  },
}
