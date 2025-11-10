import type { ColumnDef } from '@tanstack/react-table'

import { useEffect } from 'react'

import { useTableStore } from '@/store/table-store'

import { TableComp } from './table-component'

type ExternalTableProps<T> = {
  columns: ColumnDef<T>[]
  dataSource: T[]
  height?: number
  isFetching?: boolean
  isLoading?: boolean
  isShowPagination: boolean
}

export const ExternalTable = <TData,>({
  columns,
  dataSource,
  height,
  isFetching = false,
  isLoading = false,
  isShowPagination,
}: ExternalTableProps<TData>) => {
  const { pagination, setPagination } = useTableStore()

  useEffect(() => {
    setPagination({ limit: 10, page: 1 })
  }, [dataSource.length, setPagination])

  const paginationProps = {
    limit: pagination.limit,
    page: pagination.page,
    total: dataSource.length,
  }

  return (
    <TableComp
      columns={columns}
      dataSource={dataSource}
      height={height}
      isFetching={isFetching}
      isLoading={isLoading}
      isShowPagination={isShowPagination}
      pagination={paginationProps}
    />
  )
}
