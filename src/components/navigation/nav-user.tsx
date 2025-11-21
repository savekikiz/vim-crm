'use client'

import { IconDotsVertical, IconLogout } from '@tabler/icons-react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { ROUTES } from '@/constants/routes'

type NavUserProps = {
  user: {
    email: string
    image: string
    name: string
  }
}

const DEFAULT_USER = {
  EMAIL: 'default@mail.com',
  IMAGE: '',
  NAME: 'vim ocr',
}

export function NavUser({ user }: Readonly<NavUserProps>) {
  const router = useRouter()
  const { isMobile } = useSidebar()

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    })
    router.replace(ROUTES.LOGIN)
  }

  // TODO: uncomment when SSO is ready
  // const getFallbackDisplayName = () => {
  //   const [firstName, lastName] = DEFAULT_USER.NAME.split(' ')
  //   return `${firstName.charAt(0)} ${lastName.charAt(0)}`
  // }

  const getFallbackLocalDisplayName = () => {
    const [firstName = '', lastName = ''] = user.name?.split(' ') ?? []
    return `${firstName.charAt(0)} ${lastName.charAt(0)}`
  }

  const fallbackDisplayName = getFallbackLocalDisplayName()
  const name = user.name || DEFAULT_USER.NAME
  const email = user.email || DEFAULT_USER.EMAIL

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="group data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage alt="avatar-image" src={user.image} />
                <AvatarFallback className="rounded-lg text-black">
                  {fallbackDisplayName}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="truncate text-xs text-muted-foreground group-data-[state=open]:text-sidebar-accent-foreground">
                  {email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage alt={user.name} src={user.image} />
                  <AvatarFallback className="rounded-lg">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={handleLogout}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
