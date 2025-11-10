'use server'

import type { AxiosError } from 'axios'

import axios from 'axios'

export const server = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
})

server.interceptors.response.use(
  (response) => response.data.data,
  (error: AxiosError) => {
    if (error.code === 'ERR_NETWORK' || !error.response) {
      const networkError = new Error(
        'Network error: Unable to connect to the server'
      )
      networkError.name = 'NetworkError'
      return Promise.reject(networkError)
    }

    if (error?.response?.status === 401) {
      // remove cookie
    }

    return Promise.reject(error)
  }
)
