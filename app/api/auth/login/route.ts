import { NextRequest, NextResponse } from 'next/server'
import { serverInstance } from '@/src/config/server'

export async function POST(request: NextRequest) {
	const body = await request.json()
	const res = await serverInstance.post('/auth/login', body)
	return NextResponse.json(res.data, { status: res.status })
}
