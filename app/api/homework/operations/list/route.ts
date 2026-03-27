import { NextRequest, NextResponse } from 'next/server'
import { serverInstance } from '@/src/config/server'

export async function GET(request: NextRequest) {
	const page = request.nextUrl.searchParams.get('page')
	const status = request.nextUrl.searchParams.get('status')
	const type = request.nextUrl.searchParams.get('type')
	const group_id = request.nextUrl.searchParams.get('group_id')

	const res = await serverInstance.get('/homework/operations/list', {
		params: {
			page,
			status,
			type,
			group_id
		}
	})

	return NextResponse.json(res.data, { status: res.status })
}

