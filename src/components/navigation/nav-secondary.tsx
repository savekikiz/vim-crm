'use client'

import { type Icon } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

type NavSecondaryProps = {
  items: {
    icon: Icon
    title: string
    url: string
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>

export function NavSecondary({ items, ...props }: NavSecondaryProps) {
  const t = useTranslations('common.sidebar')

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{t(item.title)}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
