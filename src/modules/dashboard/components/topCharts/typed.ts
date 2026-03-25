export type Props = {
	topChartsOrder: TopChartId[]
}

export type TopChartId = 'attendance' | 'grades'

export type DashboardChartItem = {
	date: string
	points: number
	previous_points: number | null
	has_rasp: boolean | null
}

export type DashboardChartResponse = DashboardChartItem[]
