import { LoginForm, QuickLoginDemo } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm />
        <QuickLoginDemo />
      </div>
    </div>
  )
}
