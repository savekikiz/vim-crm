'use client'

import { useForm } from 'react-hook-form'

import { Form } from '@/components/ui/form'

import { FormFile } from './components'

export const FilesDetailContainer = () => {
  const form = useForm({})

  const handleSubmit = (data: unknown) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return (
    <Form {...form}>
      <form className="size-full" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormFile />
      </form>
    </Form>
  )
}
