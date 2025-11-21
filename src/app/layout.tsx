import type { Metadata } from 'next'

import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'
import localFont from 'next/font/local'
import { Suspense } from 'react'
import { Toaster } from 'sonner'

import './globals.css'

import { TanstackProvider } from '@/lib/tanstack-query'

const ibmSans = localFont({
  src: [
    {
      path: '../assets/fonts/IBMPlexSansThai-Bold.ttf',
      style: 'normal',
      weight: '700',
    },
    {
      path: '../assets/fonts/IBMPlexSansThai-SemiBold.ttf',
      style: 'normal',
      weight: '600',
    },
    {
      path: '../assets/fonts/IBMPlexSansThai-Medium.ttf',
      style: 'normal',
      weight: '500',
    },
    {
      path: '../assets/fonts/IBMPlexSansThai-Regular.ttf',
      style: 'normal',
      weight: '400',
    },
  ],
  variable: '--font-ibm-plex-sans',
})

export const metadata: Metadata = {
  description: 'VIM Invoice Management System',
  title: {
    default: 'VIM',
    template: '%s | VIM',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <body
        className={`${ibmSans.variable} ${ibmSans.className} antialiased`}
        suppressHydrationWarning
      >
        <TanstackProvider>
          <SessionProvider>
            <NextIntlClientProvider>
              {/* <ProtectedRoute> */}
              <Suspense>{children}</Suspense>
              {/* </ProtectedRoute> */}
            </NextIntlClientProvider>
          </SessionProvider>
          <Toaster
            position="top-right"
            richColors
            toastOptions={{
              classNames: {
                actionButton:
                  'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
                cancelButton:
                  'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
                description: 'group-[.toast]:text-muted-foreground',
                toast: `group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg ${ibmSans.variable} ${ibmSans.className}`,
              },
            }}
          />
        </TanstackProvider>
      </body>
    </html>
  )
}
