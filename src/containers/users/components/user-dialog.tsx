'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'

import type { User, UserFormData } from '../types'

import { FORM_DEFAULT_VALUES, userSchema } from '../utils'
import { UserForm } from './user-form'

type UserDialogProps = {
  onOpenChange: (open: boolean) => void
  onSubmit: (data: UserFormData) => void
  open: boolean
  user?: null | User
}

export const UserDialog = ({
  onOpenChange,
  onSubmit,
  open,
  user,
}: UserDialogProps) => {
  const t = useTranslations('pages.user_management')
  const tActions = useTranslations('common.actions')
  const isEdit = !!user

  const form = useForm<UserFormData>({
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: zodResolver(userSchema),
  })

  useEffect(() => {
    if (!user) return form.reset(FORM_DEFAULT_VALUES)

    form.reset({
      email: user.email,
      empId: user.empId,
      name: user.name,
      surname: user.surname,
    })
  }, [user, form])

  const handleSubmit = (data: UserFormData) => {
    onSubmit(data)
    form.reset(FORM_DEFAULT_VALUES)
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? t('dialog.edit_title') : t('dialog.add_title')}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? t('dialog.edit_description')
              : t('dialog.add_description')}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <UserForm />

            <DialogFooter className="mt-6">
              <Button
                onClick={() => onOpenChange(false)}
                type="button"
                variant="outline"
              >
                {tActions('cancel')}
              </Button>
              <Button type="submit">
                {isEdit ? tActions('save') : tActions('submit')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
