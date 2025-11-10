'use client'

import { IconBolt } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import * as React from 'react'

import { NavDocuments } from '@/components/navigation/nav-documents'
import { NavMain } from '@/components/navigation/nav-main'
import { NavTerms } from '@/components/navigation/nav-terms'
import { NavUser } from '@/components/navigation/nav-user'
import { Link } from '@/components/ui/link'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ADMIN_MAIL, SIDEBAR } from '@/constants/sidebar'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations('common.sidebar')
  const { data: session } = useSession()

  const user = {
    email: session?.user?.email ?? '',
    image: session?.user?.image ?? '',
    name: session?.user?.name ?? '',
  }

  const isAdmin = user.email === ADMIN_MAIL

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="#">
                <IconBolt className="!size-5 text-primary" />
                <span className="text-base font-semibold">{t('title')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain groupName={t('app_section')} items={SIDEBAR.APP} />
        {/* <NavDocuments
          groupName={t('document_section')}
          items={SIDEBAR.DOCUMENT}
        /> */}
        <NavDocuments
          groupName={t('dashboard_section')}
          items={SIDEBAR.EXTERNAL_DASHBOARD}
        />

        {isAdmin && (
          <NavDocuments
            groupName={t('management_section')}
            items={SIDEBAR.MANAGEMENT}
          />
        )}
      </SidebarContent>

      <SidebarFooter>
        <NavTerms />
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
