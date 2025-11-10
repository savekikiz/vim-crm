/* eslint-disable @typescript-eslint/consistent-type-definitions */

import type { DefaultJWT } from 'next-auth/jwt'

import { type DefaultSession } from 'next-auth'

interface Profile {
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

declare module 'next-auth' {
  interface Session {
    accessToken: string
    refreshToken: string
    user: DefaultSession['user'] & Profile
  }

  interface User extends DefaultSession['user'] {
    accessToken?: string
    depName: string
    depShortName: string

    // กอง
    divName: string
    divShortName: string

    email: string
    empId: string
    empPicture: string
    expiresIn?: number
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
    refreshToken?: string
    tokenType?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken?: string
    expiresIn?: number
    id: string
    refreshToken?: string
    tokenType?: string
  }
}
