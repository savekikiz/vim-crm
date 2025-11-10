'use client'

import type { ColumnDef, SortingState } from '@tanstack/react-table'

import isEmpty from 'lodash/isEmpty'

import type { FilterType, Options } from './type'

import { FilterBarComp } from '../filter-bar'
import { ExternalTable } from './external-table'
import { QueryTable } from './query-table'

export type TableProps<TData> = {
  additionalComp?: React.ReactNode
  columns: ColumnDef<TData>[]
  dataSource?: TData[]
  filterOptions?: {
    desc?: string
    disabled?: boolean
    icon?: React.ComponentType
    name: string
    options?: Options[]
    placeholder?: string
    shouldTranslate?: boolean
    suffix?: string
    type?: FilterType
    values?: number[]
  }[]
  height?: number
  initialQuery?: {
    filters?: Record<string, number[] | string | string[]>
    sortings?: SortingState
  }
  isFetching?: boolean
  isLoading?: boolean
  isShowPagination?: boolean
  path?: string
}

export const Table = <TData,>({
  additionalComp,
  columns,
  dataSource,
  filterOptions,
  height,
  initialQuery,
  isFetching = false,
  isLoading = false,
  isShowPagination = false,
  path,
}: TableProps<TData>) => {
  if (!dataSource && !path) throw Error('Please provide data or path')

  return (
    <div className="flex flex-col gap-4">
      {!isEmpty(filterOptions) && (
        <FilterBarComp
          filterOptions={filterOptions}
          initialQuery={initialQuery}
        />
      )}

      {!!additionalComp && additionalComp}

      {dataSource ? (
        <ExternalTable
          columns={columns}
          dataSource={dataSource}
          height={height}
          isFetching={isFetching}
          isLoading={isLoading}
          isShowPagination={isShowPagination}
        />
      ) : (
        <QueryTable
          columns={columns}
          height={height}
          initialQuery={initialQuery}
          path={path}
        />
      )}
    </div>
  )
}
