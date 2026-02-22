import { NextRequest, NextResponse } from 'next/server'

const LOCALES = ['ru'] as const
const DEFAULT = 'ru'

function hasLocale(pathname: string): boolean {
	const first = pathname.split('/').filter(Boolean)[0]
	return LOCALES.includes(first as (typeof LOCALES)[number])
}

export default function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname

	const first = path.split('/').filter(Boolean)[0]
	const locale = first && (LOCALES as readonly string[]).includes(first) ? first : DEFAULT
	const token = req.cookies.get('access_token')?.value
	const auth = Boolean(token)

	if (!hasLocale(path)) {
		const to = path === '/' ? `/${locale}/login` : `/${locale}${path}`
		return NextResponse.redirect(new URL(to, req.url))
	}

	const onLogin = path === `/${locale}/login` || path === `/${locale}`
	const onDashboard = path.startsWith(`/${locale}/dashboard`)

	if (auth && onLogin) return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url))
	if (!auth && (onDashboard || path === `/${locale}`)) {
		return NextResponse.redirect(new URL(`/${locale}/login`, req.url), 307)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next|favicon|robots|sitemap|manifest|.*\\.).*)']
}
