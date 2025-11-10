/**
 * Utility functions for dynamic page titles based on current route
 */

export type PageTitleKey =
  | 'app-shelf'
  | 'bill-buddy'
  | 'documents'
  | 'm-ev'
  | 'msolarfit-detail'
  | 'msolarfit'
  | 'overload-alert'
  | 'overload-detail'
  | 'power-bi'

/**
 * Maps route patterns to page title keys
 */
export const getPageTitleKey = (pathname: string): PageTitleKey => {
  // Remove leading slash and split path segments
  const segments = pathname.replace(/^\//, '').split('/')

  // Handle root dashboard or documents
  if (segments.length === 0 || segments[0] === '') {
    return 'documents'
  }

  // Handle specific routes
  switch (segments[0]) {
    case 'app-shelf':
      return 'app-shelf'

    case 'bill-buddy':
      return 'bill-buddy'

    case 'm-ev':
      return 'm-ev'

    case 'msolarfit':
      // Check if it's a detail page (has ID parameter)
      return segments.length > 1 ? 'msolarfit-detail' : 'msolarfit'

    case 'overload-alert':
      // Check if it's a detail page (has ID parameter)
      return segments.length > 1 ? 'overload-detail' : 'overload-alert'

    case 'power-bi':
      return 'power-bi'

    default:
      return 'documents'
  }
}

/**
 * Maps page title keys to translation keys
 */
export const PAGE_TITLE_MAP: Record<PageTitleKey, string> = {
  'app-shelf': 'common.sidebar.app_section',
  'bill-buddy': 'common.sidebar.app_menu.tou',
  documents: 'common.sidebar.document_section',
  'm-ev': 'common.sidebar.app_menu.ev',
  msolarfit: 'common.sidebar.app_menu.solar.title',
  'msolarfit-detail': 'common.sidebar.app_menu.solar.title',
  'overload-alert': 'common.sidebar.app_menu.overload',
  'overload-detail': 'common.sidebar.app_menu.overload',
  'power-bi': 'common.sidebar.dashboard_menu.grid_dashboard',
}

/**
 * Gets the appropriate page title translation key for the current pathname
 */
export const getPageTitle = (pathname: string): string => {
  const titleKey = getPageTitleKey(pathname)
  return PAGE_TITLE_MAP[titleKey]
}
