import type { Account, Profile, Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export type AuthorizedParams = {
  auth: null | Session
  request: NextRequest
}

export type JwtParams = {
  account?: Account | null
  isNewUser?: boolean
  profile?: Profile
  session?: unknown
  token: JWT
  trigger?: 'signIn' | 'signUp' | 'update'
  user: User
}

export type LoginLocalResponse = {
  accessToken: string
}

export type LoginResponse = {
  accessToken: string
  expiresIn: number
  refreshToken: string
  tokenType: string
}

export type ProfileLocalResponse = {
  email: string
  empId: string
  exp: number
  iat: number
  name: string
  sub: string
  surname: string
}

export type ProfileResponse = {
  depName: string
  depShortName: string

  // กอง
  divName: string
  divShortName: string

  email: string
  empId: string
  empPicture: string
  firstName: string
  firstNameEng: string
  id: string
  jobName: string
  jobShortName: string
  lastName: string
  lastNameEng: string

  // แผนก
  orgName: string
  orgShortName: string

  prefix: string
  prefixEng: string
  profilePicture: string
}

export type SessionParams = {
  session: Session
  token: JWT
}
