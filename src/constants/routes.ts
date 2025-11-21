export const ROUTES = {
  FILES: '/files',
  LOGIN: '/',
  USERS: '/users',
}

export const PUBLIC_ROUTES = [ROUTES.LOGIN]
export const ADMIN_ROUTES = [ROUTES.USERS]

export const SMART_GRID_DASHBOARD_URL =
  'https://app.powerbi.com/view?r=eyJrIjoiNWY3MmU0NTYtOGRhMy00NWQyLThlZjctMDQzNzFkMzdhZmE3IiwidCI6ImZlYmM0NDkwLTY2MjEtNGJkNy1iZmI1LTZmMDkyZjhiN2ZhYyIsImMiOjEwfQ%3D%3D'

export const LOAD_RESEARCH_URL = 'https://loadresearch.mea.or.th/'

export const SSO_URL = `${process.env.NEXT_PUBLIC_SSO_URL}?response_type=code&client_id=${process.env.NEXT_PUBLIC_SSO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SSO_REDIRECT_URI}`
