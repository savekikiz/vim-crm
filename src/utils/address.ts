/**
 * Address formatting utilities
 */

export type AddressComponents = {
  district?: null | string
  houseNumber?: null | string
  province?: null | string
  street?: null | string
  subDistrict?: null | string
  village?: null | string
}

/**
 * Formats address components into a readable address string
 * Filters out null, undefined, and empty string values
 *
 * @param components - Address components object
 * @returns Formatted address string or empty string if no valid components
 */
export const formatAddress = (components: AddressComponents): string => {
  const { district, houseNumber, province, street, subDistrict, village } =
    components

  const addressParts: string[] = []

  // Add house number if available
  if (houseNumber && houseNumber.trim() !== '') {
    addressParts.push(houseNumber.trim())
  }

  // Add street if available
  if (street && street.trim() !== '') {
    addressParts.push(street.trim())
  }

  // Add village if available
  if (village && village.trim() !== '') {
    addressParts.push(village.trim())
  }

  // Add sub-district if available
  if (subDistrict && subDistrict.trim() !== '') {
    addressParts.push(subDistrict.trim())
  }

  // Add district if available
  if (district && district.trim() !== '') {
    addressParts.push(district.trim())
  }

  // Add province if available
  if (province && province.trim() !== '') {
    addressParts.push(province.trim())
  }

  return addressParts.join(' ')
}

/**
 * Formats address components into a short address string (without prefixes)
 * Filters out null, undefined, and empty string values
 *
 * @param components - Address components object
 * @returns Short formatted address string or empty string if no valid components
 */
export const formatAddressShort = (components: AddressComponents): string => {
  const { district, houseNumber, province, street, subDistrict, village } =
    components

  const addressParts: string[] = []

  // Add components without Thai prefixes
  if (houseNumber && houseNumber.trim() !== '') {
    addressParts.push(houseNumber.trim())
  }

  if (street && street.trim() !== '') {
    addressParts.push(street.trim())
  }

  if (village && village.trim() !== '') {
    addressParts.push(village.trim())
  }

  if (subDistrict && subDistrict.trim() !== '') {
    addressParts.push(subDistrict.trim())
  }

  if (district && district.trim() !== '') {
    addressParts.push(district.trim())
  }

  if (province && province.trim() !== '') {
    addressParts.push(province.trim())
  }

  return addressParts.join(', ')
}

/**
 * Checks if any address component has a valid value
 *
 * @param components - Address components object
 * @returns True if at least one component has a valid value
 */
export const hasValidAddress = (components: AddressComponents): boolean => {
  const { district, houseNumber, province, street, subDistrict, village } =
    components

  return [houseNumber, street, village, subDistrict, district, province].some(
    (component) => component && component.trim() !== ''
  )
}
