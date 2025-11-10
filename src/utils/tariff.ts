const PROGRESSIVE = ['1.1', '1.2']

export const getTariffType = (tariff = '') => {
  const isProgressive = PROGRESSIVE.includes(tariff)
  const [_, tariffValue] = tariff.split('.')

  if (isProgressive || tariffValue === '1') return 'Progressive'
  return 'TOU'
}

export const getMainTariffCategory = (tariff = '') => {
  const [tariffType] = tariff.split('.')

  return tariffType
}
