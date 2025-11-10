'use client'

import { type Icon } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

type NavDocumentsProps = {
  groupName: string
  items: {
    icon: Icon
    name: string
    url: string
  }[]
}

export function NavDocuments({
  groupName,
  items,
}: Readonly<NavDocumentsProps>) {
  const t = useTranslations('common.sidebar')
  const pathname = usePathname()

  const isActive = (url: string) => {
    const path = pathname.split('/')[1]
    const splitUrl = url.split('/')[1]

    return path === splitUrl
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              isActive={isActive(item.url)}
              tooltip={t(item.name)}
            >
              <a href={item.url}>
                <item.icon />
                <span>{t(item.name)}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
