export const ROUTES = {
  APP_SHELF: '/app-shelf',
  BILL_BUDDY: '/bill-buddy',
  EXTERNAL: '/external',
  HOME: '/',
  LOGIN: '/',
  M_EV: '/m-ev',
  MSOLARFIT: '/msolarfit',
  OVERLOAD: '/overload-alert',
  POWER_BI: '/power-bi',
  USER_MANAGEMENT: '/user-management',
}

export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.EXTERNAL]
export const ADMIN_ROUTES = [ROUTES.USER_MANAGEMENT]

export const SMART_GRID_DASHBOARD_URL =
  'https://app.powerbi.com/view?r=eyJrIjoiNWY3MmU0NTYtOGRhMy00NWQyLThlZjctMDQzNzFkMzdhZmE3IiwidCI6ImZlYmM0NDkwLTY2MjEtNGJkNy1iZmI1LTZmMDkyZjhiN2ZhYyIsImMiOjEwfQ%3D%3D'

export const LOAD_RESEARCH_URL = 'https://loadresearch.mea.or.th/'

export const SSO_URL = `${process.env.NEXT_PUBLIC_SSO_URL}?response_type=code&client_id=${process.env.NEXT_PUBLIC_SSO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SSO_REDIRECT_URI}`
