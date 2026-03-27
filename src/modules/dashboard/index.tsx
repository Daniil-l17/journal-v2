import { BottomBlocks } from '@/src/modules/dashboard/components/bottomBlocks'
import { TopCharts } from '@/src/modules/dashboard/components/topCharts'
import { FC } from 'react'
import { Props } from './typed'

// import { Heatmap } from '@mantine/charts' // раскомментировать вместе с блоком посещаемости
// import { useQuery } from '@tanstack/react-query'
// import dayjs from 'dayjs'
// import 'dayjs/locale/ru'
// import { dashboardService } from '@/src/services/dashboard'
// import type { GradeVisitItem } from '@/src/services/dashboard/typed'

/*
const REVIEWS_MOCK = [
	{
		id: 1,
		author: 'Гайдук Илья Евгеньевич',
		subject: 'Индивидуальный проект РПО',
		date: '18.10.2025',
		text: 'Даниил имеет учебный потенциал и наверняка сможет его раскрыть, если начнет уделять время выполнению домашних работ. Лекции слушает внимательно, отлично усваивает темы.'
	}
]
*/

/*
const buildHeatmapData = (data: GradeVisitItem[] | undefined) => {
	if (!data || data.length === 0) {
		const today = dayjs()
		const month = today.month()
		const baseYear = month >= 8 ? today.year() : today.year() - 1
		const start = dayjs(`${baseYear}-09-01`)
		const end = dayjs(`${baseYear + 1}-06-30`)
		return {
			heatmapData: {} as Record<string, number>,
			startDate: start.format('YYYY-MM-DD'),
			endDate: end.format('YYYY-MM-DD'),
			attended: 0,
			total: 0
		}
	}

	const acc: Record<string, number> = {}
	let min = dayjs(data[0].date_visit)
	let attended = 0
	let total = 0

	for (const item of data) {
		const t = dayjs(item.date_visit)
		if (t.isBefore(min)) min = t

		total += 1
		if (item.status_was === 0) continue

		attended += 1
		const d = t.format('YYYY-MM-DD')
		acc[d] = (acc[d] ?? 0) + 1
	}

	const baseYear = min.month() >= 8 ? min.year() : min.year() - 1
	const start = dayjs(`${baseYear}-09-01`)
	const end = dayjs(`${baseYear + 1}-06-30`)

	return {
		heatmapData: acc,
		startDate: start.format('YYYY-MM-DD'),
		endDate: end.format('YYYY-MM-DD'),
		attended,
		total
	}
}
*/

export const Dashboard: FC<Props> = ({ topChartsOrder, bottomBlocksOrder }) => {
	/* Раскомментировать при возврате Heatmap и статистики посещаемости
	const {
		data: visitsData,
		isLoading: isVisitsLoading,
		isError: isVisitsError
	} = useQuery({
		queryKey: ['dashboard-grades-summary'],
		queryFn: () => dashboardService.getGrades(undefined)
	})

	const { heatmapData, startDate, endDate, attended, total } = useMemo(() => buildHeatmapData(visitsData), [visitsData])
	const attendancePercent = total === 0 ? 0 : Math.round((attended / total) * 100)
	*/

	return (
		<div className='flex flex-col gap-4'>
			<TopCharts topChartsOrder={topChartsOrder} />

			<BottomBlocks bottomBlocksOrder={bottomBlocksOrder} />

			{/*
			<section className='flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
				<div className='shrink-0 border-b border-gray-100 px-4 pt-4 pb-3'>
					<h3 className='text-lg font-bold leading-snug text-gray-900'>Отзывы о студенте</h3>
				</div>
				<div className='flex-1 overflow-y-auto px-4 py-3'>
					<ul className='flex flex-col gap-5'>
						{REVIEWS_MOCK.map(...)}
					</ul>
				</div>
			</section>
			*/}
		</div>
	)
}
