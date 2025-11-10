import type { Control } from 'react-hook-form'

import { AlertCircle, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { type FieldValues, type Path } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ENGLISH_REGEX } from '@/constants/regex'
import { cn } from '@/lib/utils'

type FormPasswordInputProps<T extends FieldValues> = {
  control: Control<T>
  desc?: string
  fluid?: boolean
  label?: string
  languageHintText?: string
  name: Path<T>
  placeholder?: string
  showLanguageHint?: boolean
} & Omit<React.ComponentProps<'input'>, 'type'>

export const FormPasswordInput = <T extends FieldValues>({
  control,
  desc,
  fluid = false,
  label,
  languageHintText = 'กรุณาพิมพ์เป็นภาษาอังกฤษเท่านั้น',
  name,
  placeholder,
  required = false,
  showLanguageHint = false,
  ...props
}: FormPasswordInputProps<T>) => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [hasNonEnglish, setHasNonEnglish] = useState(false)

  const togglePasswordVisibility = () => {
    setIsShowPassword((prev) => !prev)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (value: string) => void
  ) => {
    const value = e.target.value
    fieldOnChange(value)

    if (showLanguageHint && value) {
      return setHasNonEnglish(!ENGLISH_REGEX.test(value))
    }

    setHasNonEnglish(false)
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(fluid && 'w-full')}>
          {!!label && (
            <FormLabel className="flex gap-1 font-bold">
              <span>{label}</span>
              {required && <span className="text-red-600">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className="relative">
              <Input
                placeholder={placeholder}
                type={isShowPassword ? 'text' : 'password'}
                {...props}
                {...field}
                className={cn(
                  'pr-10',
                  hasNonEnglish &&
                    'border-amber-500 focus-visible:ring-amber-500',
                  props.className
                )}
                onChange={(e) => handleInputChange(e, field.onChange)}
              />
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={togglePasswordVisibility}
                tabIndex={-1}
                type="button"
              >
                {isShowPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </FormControl>
          {hasNonEnglish && showLanguageHint && (
            <FormDescription className="flex items-center gap-1 text-xs text-amber-600">
              <AlertCircle className="size-3.5" />
              {languageHintText}
            </FormDescription>
          )}
          {desc && !hasNonEnglish && (
            <FormDescription className="text-[10px]">{desc}</FormDescription>
          )}
        </FormItem>
      )}
    />
  )
}
