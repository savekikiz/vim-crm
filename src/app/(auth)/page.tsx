import type { Metadata } from 'next'

import { LoginLocalContainer } from '@/containers/login'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Page() {
  return <LoginLocalContainer />
}
