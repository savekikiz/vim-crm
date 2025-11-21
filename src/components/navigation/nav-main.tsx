'use client'

import { type Icon } from '@tabler/icons-react'
import { ChevronRight, House } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Link } from '@/components/ui/link'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { ROUTES } from '@/constants/routes'

type NavMainProps = {
  groupName: string
  items: {
    icon?: Icon
    items?: {
      title: string
      url: string
    }[]
    title: string
    url: string
  }[]
}

export function NavMain({ groupName, items }: Readonly<NavMainProps>) {
  const t = useTranslations('common.sidebar')
  const tMenu = useTranslations('common.sidebar.app_menu')
  const pathname = usePathname()

  const isActive = (url: string) => {
    const path = pathname.split('/')[1]
    const splitUrl = url.split('/')[1]

    return path === splitUrl
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/home')}
              tooltip="Quick Create"
            >
              <Link href={ROUTES.LOGIN}>
                <House />
                <span>{t('home')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroupLabel>{groupName}</SidebarGroupLabel>

        <SidebarMenu>
          {items.map((item) =>
            item?.items ? (
              <Collapsible
                asChild
                className="group/collapsible"
                // defaultOpen={item.isActive}
                key={item.title}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={tMenu(item.title)}>
                      {item.icon && <item.icon />}
                      <span>{tMenu(item.title)}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{tMenu(subItem.title)}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.url)}
                  tooltip={tMenu(item.title)}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{tMenu(item.title)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
