import type { ComponentType } from 'react'
import type { Control } from 'react-hook-form'

import { PlusCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FieldValues, type Path } from 'react-hook-form'

import { Badge } from '@/components/ui/badge'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

type FormSelectProps<T extends FieldValues> = {
  control: Control<T>
  desc?: string
  fluid?: boolean
  icon?: ComponentType<{ className?: string }>
  label?: string
  name: Path<T>
  options: {
    disabled?: boolean
    label: string
    value: string
  }[]
  placeholder?: string
  required?: boolean
  shouldTranslate?: boolean
} & React.ComponentProps<typeof SelectTrigger>

export const FormSelect = <T extends FieldValues>({
  control,
  desc,
  fluid = false,
  icon: Icon,
  label,
  name,
  options,
  placeholder,
  required = false,
  shouldTranslate = false,
  ...props
}: FormSelectProps<T>) => {
  const tOptions = useTranslations('common.options')

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedOption = options.find(
          (option) => option.value === field.value
        )
        const hasValue = !!field.value

        return (
          <FormItem className={cn(fluid && 'w-full')}>
            {!!label && (
              <FormLabel className="flex gap-1 font-bold">
                <span>{label}</span>
                {required && <span className="text-red-600">*</span>}
              </FormLabel>
            )}
            <Select onValueChange={field.onChange} value={field.value || ''}>
              <FormControl>
                <SelectTrigger
                  {...props}
                  className={cn(!label && 'h-8 border-dashed', props.className)}
                >
                  {!label ? (
                    <div className="flex w-full items-center gap-2 overflow-hidden">
                      {Icon ? (
                        <Icon className="size-4 shrink-0" />
                      ) : (
                        <PlusCircle className="size-4 shrink-0" />
                      )}
                      {hasValue && selectedOption ? (
                        <>
                          <span className="shrink-0 text-sm text-muted-foreground">
                            {placeholder}
                          </span>
                          <Separator
                            className="mx-1 h-4 shrink-0"
                            orientation="vertical"
                          />
                          <Badge
                            className="rounded-sm px-2 text-xs font-normal"
                            variant="secondary"
                          >
                            {shouldTranslate
                              ? tOptions(selectedOption.label)
                              : selectedOption.label}
                          </Badge>
                        </>
                      ) : (
                        <span className="text-sm">{placeholder}</span>
                      )}
                    </div>
                  ) : (
                    <SelectValue placeholder={placeholder} />
                  )}
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    disabled={option.disabled ?? false}
                    key={option.value}
                    value={option.value}
                  >
                    {shouldTranslate ? tOptions(option.label) : option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {desc && (
              <FormDescription className="text-[10px]">{desc}</FormDescription>
            )}
          </FormItem>
        )
      }}
    />
  )
}
