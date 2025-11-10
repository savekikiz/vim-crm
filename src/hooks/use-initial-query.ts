import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'

import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/constants/pagination'
import { parseToJson } from '@/lib/qs'
import { useTableStore } from '@/store/table-store'

export const useInitializeQuery = () => {
  const { setFilters, setPagination, setSortings } = useTableStore()
  const spr = useSearchParams().toString()

  const parsedData = useMemo(() => {
    const jsonSpr = parseToJson(spr)

    const parseSortParams = () => {
      const sortings = (jsonSpr.sortings ?? '') as string

      if (!sortings) return []

      return sortings.split(',').map((s) => {
        const desc = s.startsWith('-')
        const id = desc ? s.slice(1) : s
        return { desc, id }
      })
    }

    const sortings = parseSortParams()

    const pagination = {
      limit: jsonSpr?.limit ? parseInt(jsonSpr.limit as string) : DEFAULT_LIMIT,
      page: jsonSpr?.page ? parseInt(jsonSpr.page as string) : DEFAULT_PAGE,
    } as { limit: number; page: number }

    const filters =
      (jsonSpr.filters as Record<string, number[] | string | string[]>) ?? {}

    return { filters, pagination, sortings }
  }, [spr])

  const { filters, pagination, sortings } = parsedData

  useEffect(() => {
    setFilters(filters)
    setSortings(sortings)
    setPagination(pagination)
  }, [filters, pagination, setFilters, setPagination, setSortings, sortings])

  return {
    parsedData,
  }
}
