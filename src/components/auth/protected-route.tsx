'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ROUTES } from '@/constants/routes'
import { useToken } from '@/hooks/use-token'

type ProtectedRouteProps = {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const router = useRouter()
  const { status, token } = useToken()

  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // If session is loading, wait
    if (status === 'loading') return

    // If no token exists, redirect to login
    if (!token) return router.replace(ROUTES.LOGIN)

    // Token exists, allow access
    setIsChecking(false)
  }, [token, status, router])

  // Show fallback or loading state while checking authentication
  if (status === 'loading' || isChecking) {
    return (
      fallback ?? (
        <div className="flex h-dvh items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      )
    )
  }

  // Only render children if token exists
  return token ? <>{children}</> : null
}
