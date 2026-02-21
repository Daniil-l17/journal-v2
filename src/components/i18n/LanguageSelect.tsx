'use client'

import { Select } from '@mantine/core'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { DEFAULT_LOCALE, isLocale, Locale, LOCALES } from '@/src/store/languages'
import { useT } from '@/src/i18n/useT'

const LABELS: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
  es: 'Español',
  tr: 'Türkçe'
}

const COOKIE = 'journal_locale'

export function LanguageSelect() {
  const t = useT()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams<{ locale?: string }>()
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE

  const handleChange = (value: string | null) => {
    const next = isLocale(value) ? value : DEFAULT_LOCALE
    const maxAge = 60 * 60 * 24 * 365
    document.cookie = `${COOKIE}=${next}; path=/; max-age=${maxAge}; samesite=lax`
    const parts = (pathname ?? '/').split('/').filter(Boolean)
    if (parts.length > 0 && isLocale(parts[0])) parts[0] = next
    else parts.unshift(next)
    router.replace('/' + parts.join('/'))
  }

  return (
    <Select
      label={t('change_lang', undefined, 'Изменить язык')}
      value={locale}
      onChange={handleChange}
      data={LOCALES.map(l => ({ value: l, label: LABELS[l] }))}
      allowDeselect={false}
      searchable={false}
      w={220}
    />
  )
}
