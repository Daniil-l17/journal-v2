import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const accessToken = request.cookies.get('access_token')?.value

	const hasToken = Boolean(accessToken)
	const isDashboard = pathname === '/dashboard'
	const isLogin = pathname === '/login'
	const isHome = pathname === '/'

	if (hasToken) {
		if (isDashboard) return NextResponse.next()
		return NextResponse.redirect(new URL('/dashboard', request.url))
	} else {
		if (isLogin) return NextResponse.next()
		if (isHome || isDashboard) return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/', '/login', '/dashboard/:path*']
}
