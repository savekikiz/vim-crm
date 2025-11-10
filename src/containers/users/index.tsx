'use client'

import { IconUserPlus } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

import { Table } from '@/components/data-display/table'
import { Button } from '@/components/ui/button'
import { useDeleteApi, usePatchApi, usePostApi } from '@/hooks/use-api'

import type { User, UserFormData } from './types'

import { DeleteDialog, UserDialog } from './components'
import { createColumns } from './utils'

export const UserManagementContainer = () => {
  const tPage = useTranslations('pages.user_management')
  const tSystem = useTranslations('common.system')
  const queryClient = useQueryClient()
  const { data: session } = useSession()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<null | User>(null)
  const [userToDelete, setUserToDelete] = useState<null | User>(null)

  const { mutate: createUser } = usePostApi<User>({
    onError: () => {
      toast.error(tSystem('create_error'))
    },
    onSuccess: () => {
      toast.success(tSystem('create_success'))
      queryClient.invalidateQueries({ queryKey: ['fetch-api-list'] })
      setIsDialogOpen(false)
      setSelectedUser(null)
    },
    path: '/users',
  })

  const { mutate: updateUser } = usePatchApi<User>({
    onError: () => {
      toast.error(tSystem('update_error'))
    },
    onSuccess: () => {
      toast.success(tSystem('update_success'))
      queryClient.invalidateQueries({ queryKey: ['fetch-api-list'] })
      setIsDialogOpen(false)
      setSelectedUser(null)
    },
    path: `/users/${selectedUser?.id}`,
  })

  const { mutate: deleteUser } = useDeleteApi({
    onError: () => {
      toast.error(tSystem('delete_error'))
    },
    onSuccess: () => {
      toast.success(tSystem('delete_success'))
      queryClient.invalidateQueries({ queryKey: ['fetch-api-list'] })
      setIsDeleteDialogOpen(false)
      setUserToDelete(null)
    },
    path: userToDelete ? `/users/${userToDelete.id}` : '/users',
  })

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

  const handleDelete = (user: User) => {
    setUserToDelete(user)
    setIsDeleteDialogOpen(true)
  }

  const handleAddNew = () => {
    setSelectedUser(null)
    setIsDialogOpen(true)
  }

  const handleSubmit = (data: UserFormData) => {
    if (selectedUser) {
      updateUser(data)
    } else {
      createUser(data)
    }
  }

  const handleConfirmDelete = () => {
    if (userToDelete) deleteUser()
  }

  const currentUserId = session?.user?.id ?? ''
  const columns = createColumns(currentUserId, handleEdit, handleDelete)

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{tPage('title')}</h1>
          <p className="text-muted-foreground">{tPage('description')}</p>
        </div>
        <Button onClick={handleAddNew}>
          <IconUserPlus className="mr-2 size-4" />
          {tPage('add_user')}
        </Button>
      </div>

      <div className="flex flex-1 flex-col gap-2 @container/main">
        <Table columns={columns} path="/users" />
      </div>

      <UserDialog
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmit}
        open={isDialogOpen}
        user={selectedUser}
      />

      <DeleteDialog
        onConfirm={handleConfirmDelete}
        onOpenChange={setIsDeleteDialogOpen}
        open={isDeleteDialogOpen}
        user={userToDelete}
      />
    </div>
  )
}
