import { NextResponse } from 'next/server'
import { serverInstance } from '@/src/config/server'

export async function GET() {
	const res = await serverInstance.get('/dashboard/chart/average-progress')
	return NextResponse.json(res.data, { status: res.status })
}

