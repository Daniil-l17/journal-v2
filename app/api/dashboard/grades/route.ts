import { NextRequest, NextResponse } from 'next/server'
import { serverInstance } from '@/src/config/server'

export async function GET(request: NextRequest) {
	const spec = request.nextUrl.searchParams.get('spec')
	const res = await serverInstance.get('/progress/operations/student-visits', {
		params: spec ? { spec } : undefined
	})
	return NextResponse.json(res.data, { status: res.status })
}

