import { AppSidebar } from '@/components/navigation'
import { SiteHeader } from '@/components/navigation/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="h-full overflow-auto p-4 md:py-6 lg:px-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
