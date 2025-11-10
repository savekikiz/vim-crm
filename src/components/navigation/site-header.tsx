'use client'

import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { getPageTitle } from '@/utils/page-titles'

export function SiteHeader() {
  const pathname = usePathname()
  const t = useTranslations()

  const titleKey = getPageTitle(pathname)
  const pageTitle = t(titleKey)

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          className="mx-2 data-[orientation=vertical]:h-4"
          orientation="vertical"
        />
        <h1 className="text-base font-medium">{pageTitle}</h1>
      </div>
    </header>
  )
}
