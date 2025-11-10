'use client'

import type { ComponentType } from 'react'
import type { Control } from 'react-hook-form'

import { Check, PlusCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FieldValues, type Path, useFormContext } from 'react-hook-form'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

type FormComboboxProps<T extends FieldValues> = {
  control: Control<T>
  desc?: string
  disabled?: boolean
  fluid?: boolean
  icon?: ComponentType
  name: Path<T>
  options: {
    icon?: ComponentType<{ className?: string }>
    label: string
    value: string
  }[]
  placeholder?: string
  shouldTranslate?: boolean
}

export const FormCombobox = <T extends FieldValues>({
  control,
  desc,
  disabled,
  fluid = false,
  icon: Icon,
  name,
  options,
  placeholder,
  shouldTranslate = false,
}: FormComboboxProps<T>) => {
  const t = useTranslations('common.table.filters')
  const tOptions = useTranslations('common.options')
  const { reset } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedValues = new Set((field.value ?? []) as string[])
        const selectedAmount = selectedValues?.size ?? 0

        return (
          <FormItem className={cn(fluid, 'w-full')}>
            <Popover>
              <PopoverTrigger asChild disabled={disabled}>
                <FormControl>
                  <Button
                    className={cn(
                      'h-8 justify-start overflow-x-hidden border-dashed',
                      fluid && 'w-full'
                    )}
                    size="sm"
                    variant="outline"
                  >
                    {Icon ? <Icon /> : <PlusCircle />}
                    {placeholder}
                    {selectedAmount > 0 && (
                      <>
                        <Separator
                          className="mx-2 h-4"
                          orientation="vertical"
                        />
                        <Badge
                          className="rounded-sm px-1 font-normal lg:hidden"
                          variant="secondary"
                        >
                          {selectedAmount}
                        </Badge>
                        <div className="hidden space-x-1 lg:flex">
                          {selectedAmount > 2 ? (
                            <Badge
                              className="rounded-sm px-1 font-normal"
                              variant="secondary"
                            >
                              {selectedAmount} {t('selected')}
                            </Badge>
                          ) : (
                            options
                              .filter(({ value }) => selectedValues.has(value))
                              .map(({ label, value }) => (
                                <Badge
                                  className="rounded-sm px-1 font-normal"
                                  key={value}
                                  variant="secondary"
                                >
                                  {shouldTranslate ? tOptions(label) : label}
                                </Badge>
                              ))
                          )}
                        </div>
                      </>
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-0">
                <Command>
                  <CommandInput placeholder={placeholder} />
                  <CommandList>
                    <CommandEmpty>{t('no_data')}</CommandEmpty>
                    <CommandGroup>
                      {options.map(({ icon: OptionIcon, label, value }) => {
                        const isSelected = selectedValues.has(value)
                        return (
                          <CommandItem
                            key={value}
                            onSelect={() => {
                              if (isSelected) selectedValues.delete(value)
                              else selectedValues.add(value)

                              const filterValues = Array.from(selectedValues)
                              field.onChange(filterValues)
                            }}
                            value={shouldTranslate ? tOptions(label) : label}
                          >
                            <div
                              className={cn(
                                'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                isSelected
                                  ? 'bg-primary text-primary-foreground'
                                  : 'opacity-50 [&_svg]:invisible'
                              )}
                            >
                              <Check />
                            </div>
                            {OptionIcon && (
                              <OptionIcon className="mr-2 size-4 text-muted-foreground" />
                            )}
                            <span>
                              {shouldTranslate ? tOptions(label) : label}
                            </span>
                          </CommandItem>
                        )
                      })}
                    </CommandGroup>
                    {selectedAmount > 0 && (
                      <>
                        <CommandSeparator />
                        <CommandGroup>
                          <CommandItem
                            className="justify-center text-center"
                            onSelect={() => reset({ [name]: [] })}
                          >
                            Clear filters
                          </CommandItem>
                        </CommandGroup>
                      </>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {desc && (
              <FormDescription className="text-[10px]">{desc}</FormDescription>
            )}
          </FormItem>
        )
      }}
    />
  )
}
