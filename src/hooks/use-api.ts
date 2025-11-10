'use client'

import type { AxiosError } from 'axios'

import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

import { MINUTE } from '@/constants/time'
import {
  deleteApi,
  fetchApi,
  patchApi,
  postApi,
} from '@/lib/axios/client-request'

import { useToken } from './use-token'

type ApiListResponse<T> = {
  data: T[]
  limit: number
  page: number
  total: number
}

type UseFetchApiProps = {
  enabled?: boolean
  isKeepPreviousData?: boolean
  params?: Record<string, unknown>
  path: string
  staleTime?: number
}

type UseFetchApiWithBodyProps = {
  body?: Record<string, unknown>
  enabled?: boolean
  isKeepPreviousData?: boolean
  path: string
  staleTime?: number
}

type UsePatchApiProps<T> = {
  onError?: (error: AxiosError) => void
  onSettled?: (
    data: T | undefined,
    error: AxiosError | null,
    variables: Record<string, unknown>
  ) => void
  onSuccess?: (data: T) => void
  path: string
}

export const useFetchApiList = <T>({
  enabled = true,
  isKeepPreviousData = true,
  params,
  path,
  staleTime = 0,
}: UseFetchApiProps) => {
  const { status, token } = useToken()

  const isEnabled = enabled && status !== 'loading'

  return useQuery<unknown, AxiosError, ApiListResponse<T>>({
    enabled: isEnabled,
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
    queryFn: () => fetchApi(path, token, params),
    queryKey: ['fetch-api-list', path, params],
    staleTime: staleTime * MINUTE,
  })
}

export const useFetchApiDetail = <T>({
  enabled = true,
  params,
  path,
  staleTime = 0,
}: UseFetchApiProps) => {
  const { status, token } = useToken()

  const isEnabled = enabled && status !== 'loading'

  return useQuery<unknown, AxiosError, T>({
    enabled: isEnabled,
    placeholderData: keepPreviousData,
    queryFn: () => fetchApi(path, token, params),
    queryKey: ['fetch-api-detail', path, params],
    staleTime: staleTime * MINUTE,
  })
}

export const useFetchApiDetailWithBody = <T>({
  body,
  enabled = true,
  path,
  staleTime = 0,
}: UseFetchApiWithBodyProps) => {
  const { status, token } = useToken()

  const isEnabled = enabled && status !== 'loading'

  return useQuery<unknown, AxiosError, T>({
    enabled: isEnabled,
    placeholderData: keepPreviousData,
    queryFn: () => postApi(path, token, body),
    queryKey: ['fetch-api-detail-with-body', path, body],
    staleTime: staleTime * MINUTE,
  })
}

export const usePatchApi = <T>({
  onError,
  onSettled,
  onSuccess,
  path,
}: UsePatchApiProps<T>) => {
  const { token } = useToken()

  return useMutation<T, AxiosError, Record<string, unknown>>({
    mutationFn: (body) => patchApi(path, token, body),
    mutationKey: ['patch-api', path],
    onError,
    onSettled,
    onSuccess,
  })
}

type UsePostApiProps<T> = {
  onError?: (error: AxiosError) => void
  onSettled?: (
    data: T | undefined,
    error: AxiosError | null,
    variables: Record<string, unknown>
  ) => void
  onSuccess?: (data: T) => void
  path: string
}

export const usePostApi = <T>({
  onError,
  onSettled,
  onSuccess,
  path,
}: UsePostApiProps<T>) => {
  const { token } = useToken()

  return useMutation<T, AxiosError, Record<string, unknown>>({
    mutationFn: (body) => postApi(path, token, body),
    mutationKey: ['post-api', path],
    onError,
    onSettled,
    onSuccess,
  })
}

type UseDeleteApiProps<T> = {
  onError?: (error: AxiosError) => void
  onSettled?: (data: T | undefined, error: AxiosError | null) => void
  onSuccess?: (data: T) => void
  path: string
}

export const useDeleteApi = <T>({
  onError,
  onSettled,
  onSuccess,
  path,
}: UseDeleteApiProps<T>) => {
  const { token } = useToken()

  return useMutation<T, AxiosError>({
    mutationFn: () => deleteApi(path, token),
    mutationKey: ['delete-api', path],
    onError,
    onSettled,
    onSuccess,
  })
}
