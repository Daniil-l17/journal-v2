import { NextRequest, NextResponse } from 'next/server'

const LOCALES = ['ru', 'en', 'es', 'tr'] as const
const DEFAULT = 'ru'
const COOKIE = 'journal_locale'

function hasLocale(pathname: string): boolean {
  const first = pathname.split('/').filter(Boolean)[0]
  return LOCALES.includes(first as (typeof LOCALES)[number])
}

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const token = req.cookies.get('access_token')?.value
  const auth = Boolean(token)

  // Нет локали в пути → редирект на /locale/login
  if (!hasLocale(path)) {
    const cookieVal = req.cookies.get(COOKIE)?.value
    const locale = cookieVal && (LOCALES as readonly string[]).includes(cookieVal) ? cookieVal : DEFAULT
    const to = path === '/' ? `/${locale}/login` : `/${locale}${path}`
    return NextResponse.redirect(new URL(to, req.url))
  }

  const locale = path.split('/').filter(Boolean)[0]
  const onLogin = path === `/${locale}/login` || path === `/${locale}`
  const onDashboard = path.startsWith(`/${locale}/dashboard`)

  if (auth && onLogin) return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url))
  if (!auth && (onDashboard || path === `/${locale}`)) return NextResponse.redirect(new URL(`/${locale}/login`, req.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|favicon|robots|sitemap|manifest|.*\\.).*)']
}
