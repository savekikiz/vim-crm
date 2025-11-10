'use client'

import { useSession } from 'next-auth/react'

export const useToken = () => {
  const { data: session, status } = useSession()

  return {
    status,
    token: session?.accessToken ?? '',
  }
}
