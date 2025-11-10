import type { SortingState } from '@tanstack/react-table'

import { useTableStore } from '@/store/table-store'

import { useNavigate } from './use-navigate'

export const useTableOpts = (isApi = true) => {
  const { navigate } = useNavigate()
  const { setPagination, setSortings } = useTableStore()

  const handleLimitChange = (limit: number) => {
    setPagination({ limit, page: 1 })
    if (isApi) navigate({ limit, page: 1 })
  }

  const handlePageChange = ({ page }: { page: number }) => {
    setPagination({ page })
    if (isApi) navigate({ page })
  }

  const handlePaginationChange = (pagination: {
    limit: number
    page: number
  }) => {
    setPagination(pagination)
    if (isApi) navigate(pagination)
  }

  const handleSortChange = (sortings: SortingState) => {
    setSortings(sortings)
    if (isApi) navigate({ sortings: formatSorting(sortings) })
  }

  const formatSorting = (sortings: SortingState) => {
    return sortings.map(({ desc, id }) => `${desc ? '-' : ''}${id}`).join(',')
  }

  return {
    onLimitChange: handleLimitChange,
    onPageChange: handlePageChange,
    onPaginationChange: handlePaginationChange,
    onSortChange: handleSortChange,
  }
}
