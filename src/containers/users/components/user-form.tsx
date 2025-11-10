'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { FormInput } from '@/components/form/form-input'

import type { UserFormData } from '../types'

export const UserForm = () => {
  const t = useTranslations('pages.user_management')
  const form = useFormContext<UserFormData>()

  return (
    <div className="grid gap-4">
      <FormInput
        control={form.control}
        label={t('fields.name')}
        name="name"
        placeholder={t('placeholders.name')}
      />

      <FormInput
        control={form.control}
        label={t('fields.surname')}
        name="surname"
        placeholder={t('placeholders.surname')}
      />

      <FormInput
        control={form.control}
        label={t('fields.empId')}
        name="empId"
        placeholder={t('placeholders.empId')}
      />

      <FormInput
        control={form.control}
        label={t('fields.email')}
        name="email"
        placeholder={t('placeholders.email')}
        type="email"
      />
    </div>
  )
}
