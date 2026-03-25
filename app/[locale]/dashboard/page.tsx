import { cookies } from 'next/headers'
import { Dashboard } from '@/src/modules/dashboard'
import type { TopChartId } from '@/src/modules/dashboard/components/topCharts/typed'
import type { BottomBlockId } from '@/src/modules/dashboard/components/bottomBlocks/typed'
import { DASHBOARD_BOTTOM_BLOCKS_ORDER_COOKIE, DASHBOARD_TOP_CHARTS_ORDER_COOKIE, DEFAULT_BOTTOM_BLOCKS_ORDER, DEFAULT_TOP_CHARTS_ORDER } from '@/src/modules/dashboard/constants'

export default async function Page() {
	const cookieStore = await cookies()
	const topChartsOrder = JSON.parse(
		cookieStore.get(DASHBOARD_TOP_CHARTS_ORDER_COOKIE)?.value ?? JSON.stringify(DEFAULT_TOP_CHARTS_ORDER)
	) as TopChartId[]

	const bottomBlocksOrder = JSON.parse(
		cookieStore.get(DASHBOARD_BOTTOM_BLOCKS_ORDER_COOKIE)?.value ?? JSON.stringify(DEFAULT_BOTTOM_BLOCKS_ORDER)
	) as BottomBlockId[]

	return <Dashboard topChartsOrder={topChartsOrder} bottomBlocksOrder={bottomBlocksOrder} />
}
