import type { SortingState } from '@tanstack/react-table'

import { create } from 'zustand'

import { PAGINATION } from '@/constants/pagination'

type TableStore = TableStoreActions & TableStoreState

type TableStoreActions = {
  resetFilters: () => void
  setFilters: (filters: TableStoreState['filters']) => void
  setPagination: (pagination: Partial<TableStoreState['pagination']>) => void
  setSort: (sort: TableStoreState['sort']) => void
  setSortings: (sortings: TableStoreState['sortings']) => void
}

type TableStoreState = {
  filters: Record<string, number[] | string | string[]>
  pagination: { limit: number; page: number }
  sort: Record<string, 'ASC' | 'DESC'>
  sortings: SortingState
}

export const useTableStore = create<TableStore>((set) => ({
  filters: {},
  pagination: PAGINATION,
  resetFilters: () => set(() => ({ filters: {} })),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  setPagination: (pagination) =>
    set((state) => ({ pagination: { ...state.pagination, ...pagination } })),
  setSort: (sort) => set((state) => ({ sort: { ...state.sort, ...sort } })),
  setSortings: (sortings) => set(() => ({ sortings })),
  sort: {},
  sortings: [],
}))
