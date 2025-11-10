export const DEFAULT_PAGE = 1
export const DEFAULT_LIMIT = 10

export const PAGINATION = {
  limit: DEFAULT_LIMIT,
  page: DEFAULT_PAGE,
}

export type PaginationKey = keyof typeof PAGINATION
