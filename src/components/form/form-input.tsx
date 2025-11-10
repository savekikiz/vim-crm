import type { Control } from 'react-hook-form'

import { type FieldValues, type Path } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type FormInputProps<T extends FieldValues> = {
  control: Control<T>
  desc?: string
  fluid?: boolean
  icon?: React.ComponentType
  label?: string
  name: Path<T>
  placeholder?: string
  suffix?: React.ReactNode | string
  variant?: 'default' | 'filter'
} & React.ComponentProps<'input'>

export const FormInput = <T extends FieldValues>({
  control,
  desc,
  fluid = false,
  icon: Icon,
  label,
  name,
  placeholder,
  required = false,
  suffix,
  variant = 'default',
  ...props
}: FormInputProps<T>) => {
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
            {variant === 'filter' ? (
              <div className="relative">
                <Input
                  className={cn('h-8 border-dashed pl-8', props.className)}
                  placeholder={placeholder}
                  {...props}
                  {...field}
                />
                {Icon && (
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon />
                  </div>
                )}
                {suffix && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {suffix}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <Input placeholder={placeholder} {...props} {...field} />
                {suffix && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {suffix}
                  </div>
                )}
              </div>
            )}
          </FormControl>
          {desc && (
            <FormDescription className="text-[10px]">{desc}</FormDescription>
          )}
        </FormItem>
      )}
    />
  )
}
