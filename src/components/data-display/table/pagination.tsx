'use client'

import type { Table } from '@tanstack/react-table'

import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

type PaginationProps<T> = {
  className?: string
  table: Table<T>
}

export const Pagination = <T,>({ className, table }: PaginationProps<T>) => {
  const t = useTranslations('common.table.pagination')

  return (
    <div className={cn('flex w-full items-center gap-8 lg:w-fit', className)}>
      <div className="hidden items-center gap-2 lg:flex">
        <Label className="text-sm font-medium" htmlFor="rows-per-page">
          {t('rows_per_page')}
        </Label>
        <Select
          onValueChange={(value) => table.setPageSize(Number(value))}
          value={`${table.getState().pagination.pageSize}`}
        >
          <SelectTrigger className="w-20" id="rows-per-page">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex w-fit items-center justify-center text-sm font-medium">
        {t('page')} {table.getState().pagination.pageIndex + 1} {t('of')}{' '}
        {table.getPageCount()}
      </div>
      <div className="ml-auto flex items-center gap-2 lg:ml-0">
        <Button
          className="hidden size-8 p-0 lg:flex"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
          variant="outline"
        >
          <span className="sr-only">Go to first page</span>
          <IconChevronsLeft />
        </Button>
        <Button
          className="size-8"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          size="icon"
          variant="outline"
        >
          <span className="sr-only">Go to previous page</span>
          <IconChevronLeft />
        </Button>
        <Button
          className="size-8"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          size="icon"
          variant="outline"
        >
          <span className="sr-only">Go to next page</span>
          <IconChevronRight />
        </Button>
        <Button
          className="hidden size-8 lg:flex"
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          size="icon"
          variant="outline"
        >
          <span className="sr-only">Go to last page</span>
          <IconChevronsRight />
        </Button>
      </div>
    </div>
  )
}
