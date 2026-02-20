import { NextResponse } from 'next/server'
import { serverInstance } from '@/src/config'

export async function GET() {
	const res = await serverInstance.get('/settings/user-info')
	return NextResponse.json(res.data, { status: res.status })
}
