import qs from 'qs'

export const parseToJson = (queryString: string) => qs.parse(queryString)

export const stringify = (json: Record<string, unknown>) => qs.stringify(json)
