import type { NextAuthConfig } from 'next-auth'

import NextAuth from 'next-auth'

import { ROUTES } from '@/constants/routes'

import { authorized, credentials, jwt, session } from './credentials'

const config = {
  callbacks: {
    authorized,
    jwt,
    session,
  },
  pages: {
    signIn: ROUTES.LOGIN,
  },
  providers: [credentials],
  secret: process.env.AUTH_SECRET,
  session: {
    maxAge: 60 * 30, // 30 minutes
    strategy: 'jwt',
  },
  trustHost: true,
} satisfies NextAuthConfig

export const { auth, handlers, signIn, signOut } = NextAuth(config)
