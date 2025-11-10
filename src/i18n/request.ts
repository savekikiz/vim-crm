import { getRequestConfig } from 'next-intl/server'

const getCommon = async (locales: string, comp: string) => {
  const path = await import(`./locales/${locales}/common/${comp}.json`)

  return path.default
}

const getPages = async (locales: string, comp: string) => {
  const path = await import(`./locales/${locales}/pages/${comp}.json`)

  return path.default
}

export default getRequestConfig(async () => {
  const locale = 'th'

  return {
    locale,
    messages: {
      common: {
        actions: await getCommon(locale, 'actions'),
        options: await getCommon(locale, 'options'),
        sidebar: await getCommon(locale, 'sidebar'),
        system: await getCommon(locale, 'system'),
        table: await getCommon(locale, 'table'),
      },
      pages: {
        app_shelf: await getPages(locale, 'app_shelf'),
        bill_buddy: await getPages(locale, 'bill_buddy'),
        login: await getPages(locale, 'login'),
        m_ev: await getPages(locale, 'm_ev'),
        m_solar_fit: await getPages(locale, 'm_solar_fit'),
        m_solar_fit_detail: await getPages(locale, 'm_solar_fit_detail'),
        overload: await getPages(locale, 'overload'),
        overload_detail: await getPages(locale, 'overload_detail'),
        user_management: await getPages(locale, 'user_management'),
      },
    },
  }
})
