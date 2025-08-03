'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, LogIn, UserPlus, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/store/auth-store'
import Link from 'next/link'

export default function TeamLoginPage() {
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({ 
    email: '', 
    password: '', 
    firstName: '', 
    lastName: '' 
  })
  const [activeTab, setActiveTab] = useState('login')
  const { login, register, isLoading, error } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(loginData)
      router.push('/team-panel')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(registerData)
      router.push('/team-panel')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-500 rounded-full">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Týmový Panel
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Přihlaste se do týmového panelu Madzone
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">Přístup do týmu</CardTitle>
            <CardDescription className="text-center">
              Přihlaste se nebo si vytvořte účet pro přístup k týmovým nástrojům
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Přihlášení
                </TabsTrigger>
                <TabsTrigger value="register" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Registrace
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="vas.email@madzone.cz"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Heslo</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Přihlašuji...' : 'Přihlásit se'}
                  </Button>
                </form>

                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">Demo účty:</p>
                  <div className="text-xs text-blue-500 dark:text-blue-300 space-y-1">
                    <div>Admin: admin@madzone.cz / admin123</div>
                    <div>Editor: editor@madzone.cz / editor123</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="register" className="space-y-4 mt-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-firstname">Jméno</Label>
                      <Input
                        id="register-firstname"
                        type="text"
                        placeholder="Jan"
                        value={registerData.firstName}
                        onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-lastname">Příjmení</Label>
                      <Input
                        id="register-lastname"
                        type="text"
                        placeholder="Novák"
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="vas.email@madzone.cz"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Heslo</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>
                  
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Registruji...' : 'Vytvořit účet'}
                  </Button>
                </form>

                <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    Nové účty vyžadují schválení administrátorem před získáním přístupu k týmovým nástrojům.
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Zpět na hlavní stránku
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
