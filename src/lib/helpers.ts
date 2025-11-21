export const toAbsoluteUrl = (pathname: string): string => {
  if (pathname.startsWith('http://') || pathname.startsWith('https://')) {
    return pathname
  }

  const basePath = process.env.NEXT_PUBLIC_APP_URL || ''
  const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname
  const cleanBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath

  return `${cleanBase}/${cleanPath}`
}
