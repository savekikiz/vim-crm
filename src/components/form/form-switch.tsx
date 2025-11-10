import type { Control } from 'react-hook-form'

import { type FieldValues, type Path } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

type FormSwitchProps<T extends FieldValues> = {
  control: Control<T>
  desc?: string
  disabled?: boolean
  fluid?: boolean
  label?: string
  name: Path<T>
  required?: boolean
}

export const FormSwitch = <T extends FieldValues>({
  control,
  desc,
  disabled,
  fluid = false,
  label,
  name,
  required = false,
}: FormSwitchProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(fluid && 'w-full')}>
          <div className="flex items-center gap-4">
            {!!label && (
              <FormLabel className="order-2 flex gap-1 font-bold">
                <span>{label}</span>
                {required && <span className="text-red-600">*</span>}
              </FormLabel>
            )}
            <FormControl>
              <Switch
                checked={field.value === '1'}
                disabled={disabled}
                onCheckedChange={(value) => field.onChange(value ? '1' : '0')}
              />
            </FormControl>
          </div>
          {desc && (
            <FormDescription className="text-[10px]">{desc}</FormDescription>
          )}
        </FormItem>
      )}
    />
  )
}
