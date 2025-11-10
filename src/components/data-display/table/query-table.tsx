'use client'

import type { ColumnDef, SortingState } from '@tanstack/react-table'

import { isEmpty } from 'lodash'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { useFetchApiList } from '@/hooks/use-api'
import { useInitializeQuery } from '@/hooks/use-initial-query'

import { TableComp } from './table-component'

type QueryTableProps<T> = {
  columns: ColumnDef<T>[]
  height?: number
  initialQuery?: {
    filters?: Record<string, number[] | string | string[]>
    sortings?: SortingState
  }
  path?: string
  timeMinutes?: number
}

export const QueryTable = <TData,>({
  columns,
  height,
  initialQuery,
  path,
  timeMinutes = 5,
}: QueryTableProps<TData>) => {
  if (!path) throw Error('Please provide path')

  const tSystem = useTranslations('common.system')
  const { parsedData } = useInitializeQuery()
  const { filters, pagination, sortings } = parsedData

  const qsFilters = {
    ...(!isEmpty(initialQuery?.filters) && { ...initialQuery?.filters }),
    ...filters,
  }

  const qsSortings = {
    ...(!isEmpty(initialQuery?.sortings) && { ...initialQuery?.sortings }),
    ...sortings,
  }

  const {
    data: response,
    isError,
    isFetching,
    isLoading,
  } = useFetchApiList<TData>({
    params: {
      ...pagination,
      ...(!isEmpty(qsFilters) && { filters: qsFilters }),
      ...(!isEmpty(qsSortings) && { sortings: qsSortings }),
    },
    path,
    staleTime: timeMinutes,
  })

  const { data = [], limit = 10, page = 1, total = 0 } = response ?? {}

  const paginationProps = {
    limit: Number(pagination.limit) ?? limit,
    page: Number(pagination.page) ?? page,
    total,
  }

  useEffect(() => {
    if (isError) toast.error(tSystem('fetching_error'))
  }, [isError, tSystem])

  return (
    <TableComp
      columns={columns}
      dataSource={data}
      height={height}
      isApi
      isFetching={isFetching}
      isLoading={isLoading}
      isShowPagination
      pagination={paginationProps}
    />
  )
}
