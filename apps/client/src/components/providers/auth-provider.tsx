'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth-store'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#dc2626', // red-600 to match MadZone theme
          colorBackground: '#000000',
          colorInputBackground: '#111111',
          colorInputText: '#ffffff',
        },
        elements: {
          formButtonPrimary: 'bg-red-600 hover:bg-red-700',
          card: 'bg-black border border-red-600/20',
          headerTitle: 'text-red-600',
          formFieldLabel: 'text-gray-300',
        }
      }}
    >
      {children}
    </ClerkProvider>
  )
}
