import type { ComponentType } from 'react'

export type FilterType =
  | 'combobox'
  | 'dropdown-slide'
  | 'input'
  | 'multiselect'
  | 'select'
  | 'switch'

export type Options = {
  icon?: ComponentType<{ className?: string }>
  label: string
  value: string
}

export type Value = Record<string, number[] | string | string[]>
