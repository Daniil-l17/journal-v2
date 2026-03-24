import { NextResponse } from 'next/server'
import { serverInstance } from '@/src/config/server'

export async function GET() {
	const res = await serverInstance.get('/dashboard/chart/attendance')
	return NextResponse.json(res.data, { status: res.status })
}

