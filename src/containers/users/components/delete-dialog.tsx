'use client'

import { useTranslations } from 'next-intl'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import type { User } from '../types'

type DeleteDialogProps = {
  onConfirm: () => void
  onOpenChange: (open: boolean) => void
  open: boolean
  user: null | User
}

export const DeleteDialog = ({
  onConfirm,
  onOpenChange,
  open,
  user,
}: DeleteDialogProps) => {
  const t = useTranslations('pages.user_management')
  const tActions = useTranslations('common.actions')

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('delete_dialog.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('delete_dialog.description', { name: user?.name || '' })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{tActions('cancel')}</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={onConfirm}
          >
            {tActions('delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
