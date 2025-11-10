import type { ComponentType } from 'react'
import type { Control } from 'react-hook-form'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import { type FieldValues, type Path } from 'react-hook-form'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

type FromDropdownProps<T extends FieldValues> = {
  control: Control<T>
  desc?: string
  disabled?: boolean
  fluid?: boolean
  icon?: ComponentType
  label?: string
  name: Path<T>
  placeholder?: string
  required?: boolean
  suffix: string
  values: number[]
}

export const FormDropdown = <T extends FieldValues>({
  control,
  desc,
  disabled,
  fluid = false,
  icon: Icon,
  label,
  name,
  placeholder,
  required = false,
  suffix,
  values,
  ...props
}: FromDropdownProps<T>) => {
  const [value, setValue] = useState(values)

  const formatRangeValue = (value: number[]) => {
    return `${value[0]} - ${value[1]} ${suffix}`
  }

  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue)
  }

  const handleSliderCommit = (
    newValue: number[],
    onChange: (value: number[]) => void
  ) => {
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={cn(fluid && 'w-full')}>
            {!!label && (
              <FormLabel className="flex gap-1 font-bold">
                <span>{label}</span>
                {required && <span className="text-red-600">*</span>}
              </FormLabel>
            )}
            <DropdownMenu>
              <FormControl>
                <DropdownMenuTrigger asChild disabled={disabled} {...props}>
                  <Button
                    className={cn(
                      'h-8 !justify-start overflow-x-hidden border-dashed',
                      fluid && 'w-full'
                    )}
                    size="sm"
                    variant="outline"
                  >
                    {Icon ? <Icon /> : <Plus />}
                    {placeholder}
                    {field.value && (
                      <>
                        <Separator
                          className="mx-2 h-4"
                          orientation="vertical"
                        />
                        <Badge
                          className="rounded-sm px-1 font-normal"
                          variant="secondary"
                        >
                          {formatRangeValue(field.value)}
                        </Badge>
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
              </FormControl>
              <DropdownMenuContent
                align="start"
                className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[200px] p-2"
              >
                <DropdownMenuLabel>{formatRangeValue(value)}</DropdownMenuLabel>
                <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                  <Slider
                    max={values[1]}
                    min={values[0]}
                    onValueChange={(newValue) => handleSliderChange(newValue)}
                    onValueCommit={(newValue) =>
                      handleSliderCommit(newValue, field.onChange)
                    }
                    value={value}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {desc && (
              <FormDescription className="text-[10px]">{desc}</FormDescription>
            )}
          </FormItem>
        )
      }}
    />
  )
}
