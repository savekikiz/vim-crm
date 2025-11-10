'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export const TanstackProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            retry: (failureCount, error) => checkError(failureCount, error),
          },
          queries: {
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => checkError(failureCount, error),
          },
        },
      })
  )

  const checkError = (count: number, error: Error) => {
    if (error instanceof Error && error.name === 'NetworkError')
      return count < 1

    return false
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
