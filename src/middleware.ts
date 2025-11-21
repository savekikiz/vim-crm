/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextAuthRequest } from 'next-auth'
import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'

import { PUBLIC_ROUTES, ROUTES } from './constants/routes'
import { ADMIN_MAIL } from './constants/sidebar'

export default auth((request) => middleware(request))

async function middleware(request: NextAuthRequest) {
  return NextResponse.next()
}

// async function middleware(request: NextAuthRequest) {
//   return NextResponse.next()
//   const auth = request.auth
//   const { pathname } = request.nextUrl

//   // Public routes that don't require authentication
//   const isPublicRoute = PUBLIC_ROUTES.some((route) => {
//     // Exact match for root path
//     if (route === ROUTES.LOGIN && pathname === ROUTES.LOGIN) return true
//     // For other routes, check if pathname starts with the route
//     if (route !== ROUTES.LOGIN && pathname.startsWith(route)) return true
//     return false
//   })

//   if (isPublicRoute) return NextResponse.next()
//   if (!auth?.user) return redirectToLogin(request)

//   const accessToken = auth.accessToken ?? ''

//   // If no access token, clear session and redirect to login
//   if (!accessToken) return redirectToLogin(request)

//   const { email } = auth.user ?? {}
//   const isAdmin = email === ADMIN_MAIL

//   if (!isAdmin && ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
//     return NextResponse.redirect(new URL('401', request.url))
//   }

//   // If authenticated with valid access token, proceed
//   return NextResponse.next()
// }

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL(ROUTES.LOGIN, request.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp).*)',
  ],
}
