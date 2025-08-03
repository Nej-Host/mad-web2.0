'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '@/store/auth-store'
import Link from 'next/link'

interface LoginFormProps {
  onSuccess?: () => void
  redirectTo?: string
}

export function LoginForm({ onSuccess, redirectTo = '/admin' }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { login, isLoading, error, clearError } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      return
    }

    setIsSubmitting(true)
    clearError()

    try {
      await login({ email, password })
      
      // Success callback
      if (onSuccess) {
        onSuccess()
      } else {
        router.push(redirectTo)
      }
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const loading = isLoading || isSubmitting

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-700">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <LogIn className="h-6 w-6 text-red-500" />
          Přihlášení
        </CardTitle>
        <CardDescription className="text-gray-400">
          Přihlaste se do admin panelu
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert className="border-red-500/50 bg-red-500/10">
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@madzone.cz"
              required
              disabled={loading}
              className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Heslo
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white"
            disabled={loading || !email || !password}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Přihlašuji...
              </div>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Přihlásit se
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Nemáte účet?{' '}
            <Link 
              href="/register" 
              className="text-red-400 hover:text-red-300 font-medium"
            >
              Zaregistrujte se
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function QuickLoginDemo() {
  const { login, isLoading } = useAuth()
  
  const handleDemoLogin = async () => {
    try {
      await login({
        email: 'admin@madzone.cz',
        password: 'admin123'
      })
    } catch (error) {
      console.error('Demo login failed:', error)
    }
  }

  return (
    <div className="text-center mt-4">
      <p className="text-gray-500 text-sm mb-2">Pro testování:</p>
      <Button
        onClick={handleDemoLogin}
        variant="outline"
        size="sm"
        disabled={isLoading}
        className="border-gray-600 text-gray-400 hover:bg-gray-800"
      >
        <UserPlus className="w-4 h-4 mr-2" />
        Demo přihlášení
      </Button>
    </div>
  )
}
