import { cookies } from 'next/headers'
import { Dashboard } from '@/src/modules/dashboard'
import { TopChartId } from '@/src/modules/dashboard/components/topCharts/typed'
import { DASHBOARD_TOP_CHARTS_ORDER_COOKIE, DEFAULT_TOP_CHARTS_ORDER } from '@/src/modules/dashboard/constants'

export default async function Page() {
	const cookieStore = await cookies()
	const topChartsOrder = JSON.parse(
		cookieStore.get(DASHBOARD_TOP_CHARTS_ORDER_COOKIE)?.value ?? JSON.stringify(DEFAULT_TOP_CHARTS_ORDER)
	) as TopChartId[]
	return <Dashboard topChartsOrder={topChartsOrder} />
}
