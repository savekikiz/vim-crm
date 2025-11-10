export const isObjectEqual = (
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>
) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export const removeEmpty = (obj: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== '')
  )
}
