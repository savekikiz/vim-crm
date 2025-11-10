'use client'

import type { AxiosError } from 'axios'

import axios from 'axios'
import { signOut } from 'next-auth/react'

import { ROUTES } from '@/constants/routes'

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 7000,
  withCredentials: true,
})

client.interceptors.response.use(
  (response) => response.data.data,
  (error: AxiosError) => {
    // Handle network errors without retry
    if (error.code === 'ERR_NETWORK' || !error.response) {
      const networkError = new Error(
        'Network error: Unable to connect to the server'
      )
      networkError.name = 'NetworkError'
      return Promise.reject(networkError)
    }

    // Handle unauthorized errors - token expired or invalid
    if (error?.response?.status === 401) {
      signOut({ callbackUrl: ROUTES.LOGIN })
    }

    return Promise.reject(error)
  }
)
