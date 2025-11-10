import {
  IconChargingPile,
  IconDatabase,
  IconLayoutDashboard,
  IconPlug,
  IconReport,
  IconShieldBolt,
  IconSolarPanel2,
  IconUsers,
} from '@tabler/icons-react'

export const SIDEBAR = {
  APP: [
    {
      icon: IconSolarPanel2,
      title: 'solar.title',
      url: '/msolarfit',
    },
    {
      icon: IconPlug,
      title: 'tou',
      url: '/bill-buddy',
    },
    {
      icon: IconChargingPile,
      title: 'ev',
      url: '/m-ev',
    },
    {
      icon: IconShieldBolt,
      title: 'overload',
      url: '/overload-alert',
    },
  ],
  DOCUMENT: [
    {
      icon: IconDatabase,
      name: 'document_menu.data_library',
      url: '',
    },
    {
      icon: IconReport,
      name: 'document_menu.reports',
      url: '',
    },
  ],
  EXTERNAL_DASHBOARD: [
    {
      icon: IconLayoutDashboard,
      name: 'dashboard_menu.grid_dashboard',
      url: '/power-bi',
    },
  ],
  MANAGEMENT: [
    {
      icon: IconUsers,
      name: 'management_menu.user_management',
      url: '/user-management',
    },
  ],

  USER: {
    avatar: '/avatars/shadcn.jpg',
    email: 'user@mea.or.th',
    name: 'MEA',
  },
}

export const ADMIN_MAIL = 'admin.smg@mea.or.th'
