import { redirect } from 'next/navigation'

const LOCALES = ['ru', 'en', 'es', 'tr'] as const

export default async function LocaleIndexPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const valid = LOCALES.includes(locale as (typeof LOCALES)[number])
  redirect(valid ? `/${locale}/login` : '/ru/login')
}
