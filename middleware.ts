import { NextRequest, NextResponse } from 'next/server'

const LOCALES = ['ru'] as const
const DEFAULT = 'ru'

export default function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname

	const first = path.split('/').filter(Boolean)[0]
	const locale = first && LOCALES.includes(first as (typeof LOCALES)[number]) ? first : DEFAULT

	const token = req.cookies.get('access_token')?.value
	const auth = Boolean(token)

	if (!LOCALES.includes(first as (typeof LOCALES)[number])) {
		const to = path === '/' ? `/${locale}` : `/${locale}${path}`
		return NextResponse.redirect(new URL(to, req.url), 307)
	}

	const isRoot = path === `/${locale}`
	const onLogin = path === `/${locale}/login`
	const onDashboard = path.startsWith(`/${locale}/dashboard`)

	if (isRoot) {
		const to = auth ? `/${locale}/dashboard` : `/${locale}/login`
		return NextResponse.redirect(new URL(to, req.url), 307)
	}

	if (auth && onLogin) {
		return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url), 307)
	}

	if (!auth && onDashboard) {
		return NextResponse.redirect(new URL(`/${locale}/login`, req.url), 307)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next|favicon|robots|sitemap|manifest|.*\\.).*)']
}
