import type { ColumnDef } from '@tanstack/react-table'

import { IconEdit, IconTrash } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'

import type { User } from '../types'

const getTranslation = (key: string) => `pages.user_management.table.${key}`

export const createColumns = (
  currentUserId: string,
  onEdit: (user: User) => void,
  onDelete: (user: User) => void
): ColumnDef<User>[] => [
  {
    accessorKey: 'name',
    enableMultiSort: true,
    header: getTranslation('name'),
  },
  {
    accessorKey: 'surname',
    enableMultiSort: true,
    header: getTranslation('surname'),
  },
  {
    accessorKey: 'empId',
    enableMultiSort: true,
    header: getTranslation('empId'),
  },
  {
    accessorKey: 'email',
    enableMultiSort: true,
    header: getTranslation('email'),
  },

  {
    accessorKey: 'actions',
    cell: ({ row }) => {
      const user = row.original
      const isCurrentUser = user.id === currentUserId

      if (isCurrentUser) return <div className="size-10" />

      return (
        <div className="flex items-center gap-2">
          <Button
            aria-label={`Edit ${user.name}`}
            onClick={() => onEdit(user)}
            size="icon"
            variant="ghost"
          >
            <IconEdit className="size-4" />
          </Button>
          <Button
            aria-label={`Delete ${user.name}`}
            onClick={() => onDelete(user)}
            size="icon"
            variant="ghost"
          >
            <IconTrash className="size-4 text-destructive" />
          </Button>
        </div>
      )
    },
    enableSorting: false,
    header: getTranslation('actions'),
    size: 100,
  },
]
