'use server'

import type { AxiosRequestConfig } from 'axios'

import { server } from './server'

export const fetchApiWithConfig = async <T>({
  config,
  method = 'GET',
  params,
  path,
}: {
  config: AxiosRequestConfig
  method?: 'DELETE' | 'GET' | 'POST' | 'PUT'
  params?: Record<string, unknown>
  path: string
}): Promise<T> => {
  const response = await server({
    ...config,
    method,
    params,
    url: path,
  })

  return response as T
}

export const fetchApi = async (
  path: string,
  params?: Record<string, unknown>
) => {
  const response = await server({
    method: 'GET',
    params,
    url: path,
  })

  return response
}

export const postApi = async <T>(
  path: string,
  body?: Record<string, unknown>
) => {
  const response = await server({
    data: body,
    method: 'POST',
    url: path,
  })

  return response as T
}

export const loginApi = async (body: Record<string, unknown>) => {
  const response = await server({
    baseURL: process.env.SSO_URL_TOKEN,
    data: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  })

  return response
}
