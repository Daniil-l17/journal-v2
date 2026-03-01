import { NextRequest, NextResponse } from 'next/server'
import { serverInstance } from '@/src/config/server'

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const dateFilter = searchParams.get('date_filter')
	if (!dateFilter) {
		return NextResponse.json({ error: 'date_filter required' }, { status: 400 })
	}
	const res = await serverInstance.get('/schedule/operations/get-by-date', {
		params: { date_filter: dateFilter }
	})
	return NextResponse.json(res.data, { status: res.status })
}
