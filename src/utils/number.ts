export const formatNumber = (
  value: number | string,
  locales?: string | string[],
  options?: Intl.NumberFormatOptions
) =>
  Number(value).toLocaleString(locales, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    ...options,
  })

export const formatCurrency = (
  value: number | string,
  locales?: string | string[],
  options?: Intl.NumberFormatOptions
) => `฿${formatNumber(value, locales, options)}`

export const formatCount = (
  value: number | string,
  locales?: string | string[],
  options?: Intl.NumberFormatOptions
) =>
  formatNumber(value, locales, {
    ...options,
    maximumFractionDigits: undefined,
    minimumFractionDigits: undefined,
  })
