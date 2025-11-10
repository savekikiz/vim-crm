import type { Metadata } from 'next'

import { UserManagementContainer } from '@/containers/users'

export const metadata: Metadata = {
  title: 'User Management',
}

export default function Page() {
  return <UserManagementContainer />
}
