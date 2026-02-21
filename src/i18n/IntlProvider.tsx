'use client'

import { ReactNode, useEffect, useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import { useParams } from 'next/navigation'
import { DEFAULT_LOCALE, isLocale } from '@/src/store/languages'
import { MESSAGES } from './messages'

export function AppIntlProvider({ children }: { children: ReactNode }) {
  const params = useParams<{ locale?: string }>()
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE

  const messages = useMemo(() => MESSAGES[locale] ?? MESSAGES[DEFAULT_LOCALE], [locale])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={DEFAULT_LOCALE}
      messages={messages}
      onError={err => { if (err.code === 'MISSING_TRANSLATION') return; console.error(err) }}
    >
      {children}
    </IntlProvider>
  )
}
