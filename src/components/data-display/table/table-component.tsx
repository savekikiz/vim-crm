'use client'

import type {
  ColumnDef,
  CoreHeader,
  PaginationState,
  SortingState,
  Updater,
} from '@tanstack/react-table'

import {
  IconChevronDown,
  IconChevronUp,
  IconDatabaseOff,
  IconSelector,
} from '@tabler/icons-react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as TableUI,
} from '@/components/ui/table'
import { useTableOpts } from '@/hooks/use-table-opts'
import { cn } from '@/lib/utils'
import { useTableStore } from '@/store/table-store'

import { Pagination } from './pagination'

const SORT = {
  asc: <IconChevronUp color="hsl(var(--accent))" width={15} />,
  desc: <IconChevronDown color="hsl(var(--accent))" width={15} />,
}

const ALIGN = {
  center: 'justify-center text-center',
  left: 'justify-start text-start',
  right: 'justify-end text-end',
}

type TableCompProps<TData> = {
  className?: string
  columns: ColumnDef<TData>[]
  dataSource: TData[]
  height?: number
  isApi?: boolean
  isFetching?: boolean
  isLoading?: boolean
  isShowPagination?: boolean
  pagination: {
    limit: number
    page: number
    total: number
  }
  showRowNumber?: boolean
}

export const TableComp = <TData,>({
  className,
  columns,
  dataSource,
  height = 635,
  isApi = false,
  isFetching = false,
  isLoading,
  isShowPagination = false,
  pagination,
  showRowNumber = true,
}: TableCompProps<TData>) => {
  const tTable = useTranslations('common.table')
  const t = useTranslations()

  const { sortings } = useTableStore()
  const { onPaginationChange, onSortChange } = useTableOpts(isApi)

  const renderSortingHeader = (header: CoreHeader<TData, unknown>) => {
    const sortKey = header.column?.getIsSorted()
    const canSort = header.column?.getCanSort()

    if (!canSort) return <></>
    if (!sortKey) return <IconSelector color="hsl(var(--accent))" width={15} />

    return SORT[sortKey]
  }

  const getUpdater = <T,>(updater: Updater<T>, state: T) => {
    return typeof updater === 'function'
      ? (updater as (old: T) => T)(state)
      : updater
  }

  const handlePageChange = (updater: Updater<PaginationState>) => {
    const paginationState = getUpdater(updater, convertedPagination)

    const isChangeLimit =
      paginationState.pageSize !== convertedPagination.pageSize

    const page = isChangeLimit ? 1 : paginationState.pageIndex + 1

    onPaginationChange({
      limit: paginationState.pageSize,
      page,
    })
  }

  const handleSortChange = (updater: Updater<SortingState>) => {
    const sortState = getUpdater(updater, sortings)
    onSortChange(sortState)
  }

  const convertPagination = (pagination: {
    limit: number
    page: number
    total: number
  }) => ({
    pageIndex: pagination.page - 1,
    pageSize: pagination.limit,
  })

  const convertedPagination = convertPagination(pagination)
  const fallbackData = useMemo(() => [], [])

  const rowNumberColumn = useMemo(
    (): ColumnDef<TData> => ({
      cell: ({ row }) => {
        const rowNumber = isApi
          ? (pagination.page - 1) * pagination.limit + row.index + 1
          : row.index + 1

        return <span className="font-medium">{rowNumber}</span>
      },
      enableSorting: false,
      header: tTable('number'),
      id: 'rowNumber',
      meta: {
        align: 'right',
      },
      size: 50,
    }),
    [pagination.page, pagination.limit, tTable, isApi]
  )

  const finalColumns = useMemo(() => {
    // Translate column headers
    const translatedColumns = columns.map((column) => ({
      ...column,
      header:
        typeof column.header === 'string'
          ? t(column.header)
          : (column.header as unknown as string),
    }))

    if (!showRowNumber) return translatedColumns
    return [rowNumberColumn, ...translatedColumns]
  }, [showRowNumber, rowNumberColumn, columns, t])

  const table = useReactTable<TData>({
    autoResetPageIndex: false,
    columns: finalColumns,
    data: dataSource ?? fallbackData,
    debugTable: true,
    enableMultiSort: true,
    enableSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    isMultiSortEvent: () => true,
    manualPagination: isApi, // Always use manual pagination to sync with store
    manualSorting: isApi,
    onPaginationChange: handlePageChange,
    onSortingChange: handleSortChange,
    pageCount: pagination.total
      ? Math.ceil(pagination.total / pagination.limit)
      : 1,
    rowCount: pagination.total ?? 0,
    state: {
      pagination: convertedPagination,
      sorting: sortings,
    },
  })

  const { getAllColumns, getHeaderGroups, getRowModel } = table

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-lg border">
        {/* Fetching overlay */}
        {isFetching && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="size-6 animate-spin rounded-full border-b-2 border-primary"></div>
              <span className="text-sm text-muted-foreground">
                {dataSource?.length > 0
                  ? tTable('updating')
                  : tTable('loading')}
              </span>
            </div>
          </div>
        )}
        <div className="overflow-auto" style={{ height: `${height}px` }}>
          <TableUI className={className}>
            <TableHeader className="sticky top-0 z-10 bg-muted">
              {getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const align = header.column.columnDef.meta?.align ?? 'left'
                    const alignmentClass = ALIGN[align]
                    const isViewColumn = header.column.id === 'view'

                    return (
                      <TableHead
                        className={cn(
                          'whitespace-nowrap border-primary-foreground/20 bg-primary font-bold text-primary-foreground',
                          isViewColumn &&
                            'sticky right-0 z-20 shadow-[-2px_0_4px_rgba(0,0,0,0.1)] backdrop-blur-sm'
                        )}
                        colSpan={header.colSpan}
                        key={header.id}
                        style={{ width: header.getSize() }}
                      >
                        <button
                          aria-label={header.column.id}
                          className={cn(
                            'flex w-full items-center !justify-between',
                            alignmentClass
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {renderSortingHeader(header)}
                        </button>
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {getRowModel().rows?.length ? (
                getRowModel().rows.map((row) => (
                  <TableRow
                    className={`${
                      row.index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } data-[state=selected]:bg-muted-foreground/30`}
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const align = cell.column.columnDef.meta?.align ?? 'left'
                      const alignmentClass = ALIGN[align]
                      const isViewColumn = cell.column.id === 'view'

                      return (
                        <TableCell
                          className={cn(
                            alignmentClass,
                            'whitespace-nowrap',
                            isViewColumn &&
                              `sticky right-0 z-[9] shadow-[-2px_0_4px_rgba(0,0,0,0.1)] backdrop-blur-sm ${
                                row.index % 2 === 0
                                  ? 'bg-gray-50/90'
                                  : 'bg-white/90'
                              }`
                          )}
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              ) : isLoading ? (
                Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    {getAllColumns().map((column) => {
                      const isViewColumn = column.id === 'view'
                      return (
                        <TableCell
                          className={cn(
                            'p-4',
                            isViewColumn &&
                              'sticky right-0 z-10 bg-white/90 shadow-[-2px_0_4px_rgba(0,0,0,0.1)] backdrop-blur-sm'
                          )}
                          key={column.id}
                        >
                          <Skeleton className="h-5" />
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow style={{ height: `${height - 50 - 15}px` }}>
                  <TableCell
                    className="text-center"
                    colSpan={getAllColumns().length}
                  >
                    <div className="flex flex-col items-center justify-center gap-3 py-12">
                      <div className="rounded-full bg-muted p-4">
                        <IconDatabaseOff
                          className="text-muted-foreground"
                          size={48}
                          stroke={1.5}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-base font-medium text-foreground">
                          {tTable('no_data')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {tTable('no_data_description')}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </TableUI>
        </div>
      </div>

      {isShowPagination && <Pagination className="self-end" table={table} />}
    </div>
  )
}
