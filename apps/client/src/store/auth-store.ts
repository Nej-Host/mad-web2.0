import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { authApi, authUtils, type User, type LoginCredentials, type RegisterData } from '@/lib/api/auth'

interface AuthState {
  // State
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  getCurrentUser: () => Promise<void>
  refreshToken: () => Promise<void>
  clearError: () => void
  setLoading: (loading: boolean) => void
  
  // Initialization
  initialize: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        token: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,

        // Actions
        login: async (credentials: LoginCredentials) => {
          set({ isLoading: true, error: null })
          
          try {
            const response = await authApi.login(credentials)
            
            if (response.success && response.token && response.user) {
              // Save to localStorage
              authUtils.saveAuthData(response.token, response.user)
              
              // Update store
              set({
                user: response.user,
                token: response.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              })
            } else {
              throw new Error(response.message || 'Login failed')
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Login failed',
              isLoading: false,
              isAuthenticated: false,
            })
            throw error
          }
        },

        register: async (userData: RegisterData) => {
          set({ isLoading: true, error: null })
          
          try {
            const response = await authApi.register(userData)
            
            if (response.success && response.token && response.user) {
              // Save to localStorage
              authUtils.saveAuthData(response.token, response.user)
              
              // Update store
              set({
                user: response.user,
                token: response.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              })
            } else {
              throw new Error(response.message || 'Registration failed')
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Registration failed',
              isLoading: false,
              isAuthenticated: false,
            })
            throw error
          }
        },

        logout: async () => {
          set({ isLoading: true })
          
          try {
            await authApi.logout()
          } catch (error) {
            console.error('Logout API call failed:', error)
            // Continue with logout even if API call fails
          }
          
          // Clear localStorage
          authUtils.clearAuthData()
          
          // Reset store
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          })
        },

        getCurrentUser: async () => {
          const { token } = get()
          
          if (!token) {
            set({ isAuthenticated: false, user: null })
            return
          }

          set({ isLoading: true, error: null })
          
          try {
            const user = await authApi.getCurrentUser()
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          } catch (error) {
            console.error('Get current user failed:', error)
            
            // Token might be invalid, clear auth data
            authUtils.clearAuthData()
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: 'Session expired',
            })
          }
        },

        refreshToken: async () => {
          const { token } = get()
          
          if (!token) {
            return
          }

          try {
            const response = await authApi.refreshToken()
            
            if (response.success && response.token && response.user) {
              // Save new token
              authUtils.saveAuthData(response.token, response.user)
              
              // Update store
              set({
                user: response.user,
                token: response.token,
                isAuthenticated: true,
                error: null,
              })
            }
          } catch (error) {
            console.error('Token refresh failed:', error)
            
            // Refresh failed, logout user
            get().logout()
          }
        },

        clearError: () => set({ error: null }),
        
        setLoading: (loading: boolean) => set({ isLoading: loading }),

        // Initialize from localStorage
        initialize: () => {
          const { token, user } = authUtils.getAuthData()
          
          if (token && user) {
            set({
              token,
              user,
              isAuthenticated: true,
            })
            
            // Verify token is still valid
            get().getCurrentUser()
          }
        },
      }),
      {
        name: 'auth-store',
        // Only persist essential data
        partialize: (state) => ({
          token: state.token,
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: 'auth-store',
    }
  )
)

// Selector hooks for convenience
export const useAuth = () => {
  const store = useAuthStore()
  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
    login: store.login,
    register: store.register,
    logout: store.logout,
    clearError: store.clearError,
  }
}

export const useAuthActions = () => {
  const store = useAuthStore()
  return {
    login: store.login,
    register: store.register,
    logout: store.logout,
    getCurrentUser: store.getCurrentUser,
    refreshToken: store.refreshToken,
    clearError: store.clearError,
    initialize: store.initialize,
  }
}

// Auth guards
export const useAuthGuard = () => {
  const { isAuthenticated, user } = useAuth()
  
  return {
    isAuthenticated,
    isAdmin: user?.role === 'admin',
    isEditor: user?.role === 'editor' || user?.role === 'admin',
    hasRole: (role: string) => authUtils.hasRole(role),
  }
}
