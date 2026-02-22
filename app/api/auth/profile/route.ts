import { NextResponse } from 'next/server'
import { serverInstance } from '@/src/config/server'

const COOKIE_DELETE =
	'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; SameSite=Lax; HttpOnly'
const REFRESH_DELETE =
	'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; SameSite=Lax; HttpOnly'

export async function GET() {
	const res = await serverInstance.get('/settings/user-info')

	if (res.status === 401) {
		const response = NextResponse.json(res.data, { status: 401 })
		response.headers.append('Set-Cookie', COOKIE_DELETE)
		response.headers.append('Set-Cookie', REFRESH_DELETE)
		return response
	}

	return NextResponse.json(res.data, { status: res.status })
}
