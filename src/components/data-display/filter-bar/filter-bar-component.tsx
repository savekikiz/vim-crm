'use client'

import type { SortingState } from '@tanstack/react-table'
import type { ComponentType } from 'react'
import type { Control } from 'react-hook-form'

import { ChevronDown, Search, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { PAGINATION } from '@/constants/pagination'
import { useNavigate } from '@/hooks/use-navigate'
import { useTableStore } from '@/store/table-store'
import { removeEmpty } from '@/utils/object'

import type { Options, Value } from '../table/type'

import { FilterOptions } from './filter-options'

type FilterBarCompProps = {
  filterOptions?: FilterOption[]
  initialQuery?: {
    filters?: Record<string, number[] | string | string[]>
    sortings?: SortingState
  }
}

type FilterGridProps = {
  control: Control<Value>
  filters: FilterOption[]
  gridCols: string
}

type FilterOption = {
  disabled?: boolean
  icon?: ComponentType
  name: string
  options?: Options[]
  placeholder?: string
  suffix?: string
}

type ToolbarButtonsProps = {
  hasMoreFilters: boolean
  isExpanded: boolean
  onClearFilters: () => void
  onToggleExpanded: () => void
  t: (key: string) => string
}

const FilterGrid = ({ control, filters, gridCols }: FilterGridProps) => (
  <div className={`grid ${gridCols} gap-4`}>
    {filters.map((filter) => (
      <div className="col-span-1" key={filter.name}>
        <FilterOptions {...filter} className="w-full" control={control} />
      </div>
    ))}
  </div>
)

const ToolbarButtons = ({
  hasMoreFilters,
  isExpanded,
  onClearFilters,
  onToggleExpanded,
  t,
}: ToolbarButtonsProps) => (
  <>
    {hasMoreFilters && (
      <Button
        className="h-8"
        onClick={onToggleExpanded}
        size="sm"
        type="button"
        variant="outline"
      >
        <ChevronDown
          className={`size-4 transition-transform duration-200${isExpanded ? 'rotate-180' : 'rotate-0'}`}
        />

        <span className="sr-only">
          {isExpanded ? 'Collapse filters' : 'Expand filters'}
        </span>
      </Button>
    )}

    <div className="flex flex-1 flex-col gap-4">
      <Button className="h-8 w-full" size="sm" type="submit">
        <Search className="size-4" />
        <span>{t('search')}</span>
      </Button>

      {!hasMoreFilters ||
        (isExpanded && (
          <Button
            className="h-8"
            onClick={onClearFilters}
            size="sm"
            type="button"
            variant="secondary"
          >
            <X className="size-4" />
            <span>{t('reset')}</span>
          </Button>
        ))}
    </div>
  </>
)

export const FilterBarComp = ({
  filterOptions = [],
  initialQuery,
}: FilterBarCompProps) => {
  const t = useTranslations('common.table.filters')
  const [isExpanded, setIsExpanded] = useState(false)

  const { filters, resetFilters, setFilters, setPagination } = useTableStore()
  const { navigate } = useNavigate()

  const form = useForm({
    mode: 'onChange',
  })
  const { control, handleSubmit, reset, setValue } = form

  const onSubmit = async (data: Value) => {
    const formattedData = removeEmpty(data)
    setFilters(formattedData as Record<string, number[] | string | string[]>)
    setPagination(PAGINATION)

    navigate({ filters: formattedData, sortings: [], ...PAGINATION })
  }

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  const clearFilters = () => {
    reset()
    resetFilters()
    setPagination(PAGINATION)

    navigate({ filters: {}, sortings: [], ...PAGINATION })
  }

  const visibleFilters = filterOptions?.slice(0, 3) || []
  const hasMoreFilters = (filterOptions?.length || 0) > 3

  useEffect(() => {
    filterOptions.forEach(({ name }) => {
      const val = filters?.[name] ?? initialQuery?.filters?.[name] ?? ''
      setValue(name, val)
    })
  }, [filterOptions, filters, initialQuery, setValue])

  const renderCollapsedLayout = () => (
    <div className="grid grid-cols-4 gap-4">
      {/* First 3 columns for filters */}
      {visibleFilters.map((filter) => (
        <div className="col-span-1" key={filter.name}>
          <FilterOptions {...filter} className="w-full" control={control} />
        </div>
      ))}

      {/* Fill empty columns if less than 3 filters */}
      {Array.from({ length: 3 - visibleFilters.length }).map((_, index) => (
        <div className="col-span-1" key={`empty-${index}`} />
      ))}

      {/* 4th column for buttons */}
      <div className="col-span-1 flex justify-end gap-2">
        <ToolbarButtons
          hasMoreFilters={hasMoreFilters}
          isExpanded={isExpanded}
          onClearFilters={clearFilters}
          onToggleExpanded={handleToggleExpand}
          t={t}
        />
      </div>
    </div>
  )

  const renderExpandedLayout = () => (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <FilterGrid
          control={control}
          filters={filterOptions || []}
          gridCols="grid-cols-3"
        />
      </div>

      <div className="col-span-1 flex justify-end gap-2">
        <ToolbarButtons
          hasMoreFilters={hasMoreFilters}
          isExpanded={isExpanded}
          onClearFilters={clearFilters}
          onToggleExpanded={handleToggleExpand}
          t={t}
        />
      </div>
    </div>
  )

  return (
    <Card className="p-6">
      <Form {...form}>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {isExpanded ? renderExpandedLayout() : renderCollapsedLayout()}
        </form>
      </Form>
    </Card>
  )
}
