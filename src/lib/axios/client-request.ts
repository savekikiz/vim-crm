'use client'

import type { AxiosRequestConfig } from 'axios'

import { client } from './client'

export const fetchApiWithConfig = async ({
  config,
  method = 'GET',
  params,
  path,
}: {
  config: AxiosRequestConfig
  method?: 'DELETE' | 'GET' | 'POST' | 'PUT'
  params?: Record<string, unknown>
  path: string
}) => {
  const response = await client({
    ...config,
    method,
    params,
    url: path,
  })

  return response
}

export const fetchApi = async <T>(
  path: string,
  token: string,
  params?: Record<string, unknown>
): Promise<T> => {
  const response = await client({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
    params,
    url: path,
  })

  return response as T
}

export const postApi = async <T>(
  path: string,
  token: string,
  body?: Record<string, unknown>
): Promise<T> => {
  const response = await client({
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    url: path,
  })

  return response as T
}

export const patchApi = async <T>(
  path: string,
  token: string,
  body?: Record<string, unknown>
): Promise<T> => {
  const response = await client({
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'PATCH',
    url: path,
  })

  return response as T
}

export const deleteApi = async <T>(path: string, token: string): Promise<T> => {
  const response = await client({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
    url: path,
  })

  return response as T
}
