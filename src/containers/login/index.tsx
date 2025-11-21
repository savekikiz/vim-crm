'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { FormInput } from '@/components/form/form-input'
import { FormPasswordInput } from '@/components/form/form-password-input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { ROUTES } from '@/constants/routes'

import type { LoginFormValues } from './types'

const loginSchema = z.object({
  empId: z.string().min(1, 'Employee ID is required'),
  password: z.string().min(1, 'Password is required'),
})

export const LoginLocalContainer = () => {
  const t = useTranslations('pages.login')
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)

  const form = useForm<LoginFormValues>({
    defaultValues: {
      empId: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const redirectUser = () => {
    router.replace(ROUTES.FILES)
  }

  const handleLogin = async (values: LoginFormValues) => {
    return redirectUser()

    setIsLogin(true)

    const payload = {
      empId: values.empId,
      password: values.password,
    }

    try {
      const result = await signIn('credentials', {
        ...payload,
        redirect: false,
      })

      if (result?.error) throw new Error(result.error)

      toast.success(t('login_success'))
      redirectUser()
    } catch {
      toast.error(t('login_error'))
    } finally {
      setIsLogin(false)
    }
  }

  return (
    <Card className="w-[380px] rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle>{t('app_title')}</CardTitle>
        <CardDescription>{t('app_description')}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <CardContent className="space-y-4">
            <FormInput
              control={form.control}
              disabled={isLogin}
              label="รหัสพนักงาน"
              name="empId"
              placeholder="ระบุรหัสพนักงาน"
              required
            />
            <FormPasswordInput
              control={form.control}
              disabled={isLogin}
              label="รหัสผ่าน"
              name="password"
              placeholder="ระบุรหัสผ่าน"
              required
              showLanguageHint
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={isLogin} type="submit">
              {isLogin ? t('login_loading') : 'เข้าสู่ระบบ'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
