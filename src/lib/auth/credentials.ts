import type { User } from 'next-auth'

import Credentials from 'next-auth/providers/credentials'

import { PUBLIC_ROUTES } from '@/constants/routes'
import { fetchApiWithConfig, postApi } from '@/lib/axios/server-request'

import type {
  AuthorizedParams,
  JwtParams,
  LoginLocalResponse,
  ProfileLocalResponse,
  SessionParams,
} from './types'

// TODO: uncomment when SSO is ready
// export const credentials = Credentials({
//   authorize: async (credentials): Promise<null | User> => {
//     const { accessToken, expiresIn, refreshToken, tokenType } =
//       await postApi<LoginResponse>('/auth/login', credentials)

//     const userProfile = await fetchApiWithConfig<ProfileResponse>({
//       config: {
//         headers: {
//           Authorization: `${tokenType} ${accessToken}`,
//         },
//       },
//       path: '/auth/profile',
//     })

//     // Return user profile with auth tokens
//     return {
//       ...userProfile,
//       accessToken,
//       expiresIn,
//       refreshToken,
//       tokenType,
//     } as User
//   },
//   credentials: {
//     clientId: { type: 'text' },
//     code: { type: 'text' },
//     redirectUri: { type: 'text' },
//   },
//   id: 'credentials',
//   name: 'SSO Smart Office Credentials',
//   type: 'credentials',
// })

export const credentials = Credentials({
  authorize: async (credentials): Promise<null | User> => {
    const { accessToken } = await postApi<LoginLocalResponse>(
      '/auth/login-local',
      credentials
    )

    const { email, empId, exp, iat, name, sub, surname } =
      await fetchApiWithConfig<ProfileLocalResponse>({
        config: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
        path: '/auth/profile-from-jwt',
      })

    return {
      accessToken,
      email,
      empId,
      empPicture: '',
      expiresIn: exp,
      firstName: name,
      iat,
      id: sub,
      lastName: surname,
      refreshToken: accessToken,
      tokenType: 'Bearer',
    } as unknown as User
  },
  credentials: {
    empId: { type: 'text' },
    password: { type: 'password' },
  },
  id: 'credentials',
  type: 'credentials',
})

export const authorized = ({
  auth,
  request: { nextUrl },
}: AuthorizedParams) => {
  const isLoggedIn = !!auth?.user
  const isOnAuthPage = PUBLIC_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route)
  )

  if (isOnAuthPage) return true
  if (!isLoggedIn) return false
  return true
}

export const jwt = async ({ token, user }: JwtParams) => {
  // On sign in, store user data and tokens
  if (user) {
    token.email = user.email
    token.name = `${user.firstName} ${user.lastName}`
    token.picture = user.empPicture
    token.id = user.id
    // Store auth tokens from the user object
    token.accessToken = user.accessToken
    token.refreshToken = user.refreshToken
    token.tokenType = user.tokenType
    token.expiresIn = user.expiresIn
  }

  return token
}

export const session = async ({ session, token }: SessionParams) => {
  if (token?.id) {
    session.user.id = token.id as string
    session.user.email = token.email as string
    session.user.name = token.name as string
    session.user.image = token.picture as string
    // Pass auth tokens to session
    session.accessToken = token.accessToken as string
    session.refreshToken = token.refreshToken as string
  }

  return session
}
