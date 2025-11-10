'use client'

import type { ComponentType } from 'react'
import type { Control } from 'react-hook-form'

import { useState } from 'react'
import { type FieldValues, type Path } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type FormSearchButtonProps<T extends FieldValues> = {
  control: Control<T>
  desc?: string
  disabled?: boolean
  fluid?: boolean
  icon?: ComponentType
  name: Path<T>
  placeholder?: string
}

export const FormSearchButton = <T extends FieldValues>({
  control,
  desc,
  disabled,
  fluid = false,
  icon: Icon,
  name,
  placeholder,
}: FormSearchButtonProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(fluid && 'w-full')}>
          <Popover onOpenChange={setIsOpen} open={isOpen}>
            <PopoverTrigger asChild disabled={disabled}>
              <FormControl>
                <Button
                  className={cn(
                    'h-8 !justify-start overflow-x-hidden border-dashed',
                    fluid && 'w-full'
                  )}
                  size="sm"
                  variant="outline"
                >
                  {Icon && <Icon />}
                  {field.value ? (
                    <span className="truncate">{field.value}</span>
                  ) : (
                    <span className="text-muted-foreground">{placeholder}</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-[var(--radix-popover-trigger-width)] p-2"
            >
              <Input
                autoFocus
                onBlur={() => setIsOpen(false)}
                onChange={(e) => {
                  field.onChange(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === 'Escape') {
                    setIsOpen(false)
                  }
                }}
                placeholder={placeholder}
                value={field.value || ''}
              />
            </PopoverContent>
          </Popover>
          {desc && (
            <FormDescription className="text-[10px]">{desc}</FormDescription>
          )}
        </FormItem>
      )}
    />
  )
}
