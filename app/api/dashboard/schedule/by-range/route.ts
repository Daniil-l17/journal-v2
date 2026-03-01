import { NextRequest, NextResponse } from 'next/server'
import { serverInstance } from '@/src/config/server'

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const dateStart = searchParams.get('date_start')
	const dateEnd = searchParams.get('date_end')
	if (!dateStart || !dateEnd) {
		return NextResponse.json({ error: 'date_start and date_end required' }, { status: 400 })
	}
	const res = await serverInstance.get('/schedule/operations/get-by-date-range', {
		params: { date_start: dateStart, date_end: dateEnd }
	})
	return NextResponse.json(res.data, { status: res.status })
}
