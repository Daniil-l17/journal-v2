'use client'

import { useMemo, useState } from 'react'
import { Avatar, Button } from '@mantine/core'
// import { Heatmap } from '@mantine/charts' // раскомментировать вместе с блоком посещаемости
import {
	Area,
	Bar,
	BarChart as RechartsBarChart,
	CartesianGrid,
	Cell,
	ComposedChart,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'
// import { useQuery } from '@tanstack/react-query'
// import dayjs from 'dayjs'
// import 'dayjs/locale/ru'
import { BarChart3, ChevronRight, LineChart as LineChartViewIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useProfile } from '@/src/hooks/useProfile'
import { Leaderboard } from '@/src/modules/dashboard/leaderboard'
import { YourRewards } from '@/src/modules/dashboard/yourRewards'
import { ScheduledExams } from '@/src/modules/dashboard/scheduledExams'
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

/** Тестовые оценки: сент–март; сентябрь 3, октябрь 4, остальные 3 */
const GRADES_BAR_DATA = [
	{ month: 'Сен', monthLabel: 'сентябрь', grade: 3 },
	{ month: 'Окт', monthLabel: 'октябрь', grade: 4 },
	{ month: 'Ноя', monthLabel: 'ноябрь', grade: 3 },
	{ month: 'Дек', monthLabel: 'декабрь', grade: 3 },
	{ month: 'Янв', monthLabel: 'январь', grade: 3 },
	{ month: 'Фев', monthLabel: 'февраль', grade: 3 },
	{ month: 'Мар', monthLabel: 'март', grade: 3 }
]

type GradeBarRow = (typeof GRADES_BAR_DATA)[number]

const GRADE_MONTH_BY_SHORT: Record<string, string> = Object.fromEntries(GRADES_BAR_DATA.map(({ month, monthLabel }) => [month, monthLabel]))

/** Месяцы графика (сен–мар): соответствие getMonth() → ключ на оси X */
const JS_MONTH_TO_GRADE_CHART: Record<number, string> = {
	8: 'Сен',
	9: 'Окт',
	10: 'Ноя',
	11: 'Дек',
	0: 'Янв',
	1: 'Фев',
	2: 'Мар'
}

function getCurrentGradeChartMonth(): string | null {
	return JS_MONTH_TO_GRADE_CHART[new Date().getMonth()] ?? null
}

const GRADE_BAR_INACTIVE = '#9ca3af'

function getGradesAverageFromMock() {
	const sum = GRADES_BAR_DATA.reduce((s, r) => s + r.grade, 0)
	return (sum / GRADES_BAR_DATA.length).toFixed(1)
}

function GradesBarTooltip({
	active,
	payload,
	label
}: {
	active?: boolean
	payload?: ReadonlyArray<{ value?: unknown; payload?: GradeBarRow }>
	label?: unknown
}) {
	if (!active || !payload?.length) return null
	const row = payload[0].payload
	const raw = row?.grade ?? payload[0].value
	const v = raw == null ? '—' : String(Math.round(Number(raw)))
	const short = typeof label === 'string' ? label : ''
	const monthLabel = row?.monthLabel ?? GRADE_MONTH_BY_SHORT[short] ?? ''
	return (
		<div className='rounded-lg border border-gray-200 bg-white px-3 py-2.5 shadow-md transition-opacity duration-100 ease-out will-change-[opacity]'>
			<p className='text-base font-medium leading-snug text-gray-700'>{monthLabel ? `Оценка за ${monthLabel}` : 'Оценка'}</p>
			<p className='mt-1.5 text-lg font-semibold leading-none text-accent'>{v}</p>
		</div>
	)
}

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

export default function Dashboard() {
	const params = useParams<{ locale: string }>()
	const locale = params?.locale ?? 'ru'
	const { data: profile } = useProfile()
	const [gradesChartTab, setGradesChartTab] = useState<'line' | 'blocks'>('line')
	const gradesAverage = useMemo(() => getGradesAverageFromMock(), [])

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

	const currentGradeMonth = getCurrentGradeChartMonth()

	return (
		<div className='flex min-h-0 flex-col gap-4'>
			<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
				<section className='flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm'>
					<div className='shrink-0 border-b border-gray-100 px-4 pt-4 pb-3'>
						<h3 className='text-lg font-bold leading-snug text-gray-900'>Посещаемость</h3>
						{/*
						<p className='mt-1 text-sm text-gray-500'>
							{total === 0 ? 'Нет данных по посещаемости' : `Посещено ${attended} из ${total} занятий (${attendancePercent}%)`}
						</p>
						*/}
					</div>
					<div className='flex min-h-[300px] flex-1 items-center justify-center px-4 py-10'>
						<p className='text-center text-base font-medium text-gray-500'>На текущий момент в разработке</p>
					</div>
					{/*
					<div className='flex-1 p-4'>
						{isVisitsLoading || isVisitsError ? (
							<div className='flex h-[240px] items-center justify-center text-sm text-gray-500'>Загружаем посещаемость…</div>
						) : (
							<div className='w-full overflow-x-auto pb-1'>
								<Heatmap
									data={heatmapData}
									startDate={startDate}
									endDate={endDate}
									withTooltip
									withWeekdayLabels
									withMonthLabels
									rectSize={14}
									rectRadius={3}
									gap={3}
									weekdayLabels={['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']}
									monthLabels={['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']}
									getTooltipLabel={({ date, value }) =>
										`${dayjs(date).locale('ru').format('D MMM YYYY')} – ${
											value === null || value === 0
												? 'Нет посещений'
												: `${value} ${value === 1 ? 'посещение' : value < 5 ? 'посещения' : 'посещений'}`
										}`
									}
									classNames={{ root: 'w-full min-w-[480px]' }}
								/>
							</div>
						)}
					</div>
					*/}
				</section>

				<section className='flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm'>
					<div className='flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 px-4 pt-4 pb-3'>
						<h3 className='text-lg font-bold leading-snug text-gray-900'>Оценки</h3>
						<Link
							href={`/${locale}/dashboard/grades`}
							className='flex shrink-0 items-center gap-0.5 text-sm font-medium text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent/80'
						>
							Подробнее
							<ChevronRight size={16} strokeWidth={2.5} aria-hidden />
						</Link>
					</div>

					<div className='flex flex-wrap items-center justify-between gap-3 px-4 py-4'>
						<div className='min-w-0 text-left'>
							<div className='text-4xl font-bold tabular-nums leading-none text-accent'>{gradesAverage}</div>
							<div className='mt-1 text-sm font-medium text-gray-600'>Средний балл</div>
						</div>
						<div className='flex gap-2' role='group' aria-label='Тип графика'>
							<Button
								type='button'
								variant={gradesChartTab === 'line' ? 'filled' : 'default'}
								color={gradesChartTab === 'line' ? 'primary' : 'gray'}
								title='Линейный график'
								aria-label='Линейный график'
								aria-pressed={gradesChartTab === 'line'}
								onClick={() => setGradesChartTab('line')}
								size='md'
								radius='md'
								p={0}
								w={40}
								h={40}
								styles={{
									root: {
										minWidth: 40,
										flexShrink: 0,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}
								}}
							>
								<LineChartViewIcon size={20} strokeWidth={2} aria-hidden />
							</Button>
							<Button
								type='button'
								variant={gradesChartTab === 'blocks' ? 'filled' : 'default'}
								color={gradesChartTab === 'blocks' ? 'primary' : 'gray'}
								title='Столбчатый график'
								aria-label='Столбчатый график'
								aria-pressed={gradesChartTab === 'blocks'}
								onClick={() => setGradesChartTab('blocks')}
								size='md'
								radius='md'
								p={0}
								w={40}
								h={40}
								styles={{
									root: {
										minWidth: 40,
										flexShrink: 0,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}
								}}
							>
								<BarChart3 size={20} strokeWidth={2} aria-hidden />
							</Button>
						</div>
					</div>

					<div className='pr-2 pb-2'>
						{gradesChartTab === 'line' ? (
							<div className='h-[300px] w-full [&_svg]:outline-none [&_svg_*]:outline-none [&_svg_*]:focus:outline-none'>
								<ResponsiveContainer width='100%' height='100%'>
									<ComposedChart
										data={GRADES_BAR_DATA}
										margin={{ top: 12, right: 12, left: 0, bottom: 4 }}
										className='[&_svg]:outline-none [&_svg_*]:outline-none'
									>
										<defs>
											<linearGradient id='gradesLineAreaFill' x1='0' y1='0' x2='0' y2='1'>
												<stop offset='0%' stopColor='var(--color-accent)' stopOpacity={0.22} />
												<stop offset='100%' stopColor='var(--color-accent)' stopOpacity={0} />
											</linearGradient>
										</defs>
										<CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' vertical={false} />
										<XAxis dataKey='month' tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
										<YAxis
											domain={[0, 5]}
											ticks={[0, 1, 2, 3, 4, 5]}
											tick={{ fill: '#6b7280', fontSize: 12 }}
											axisLine={false}
											tickLine={false}
											width={36}
											allowDecimals={false}
										/>
										<Tooltip
											animationDuration={110}
											animationEasing='ease-out'
											content={GradesBarTooltip}
											wrapperStyle={{ transition: 'transform 90ms ease-out' }}
										/>
										<Area
											type='monotone'
											dataKey='grade'
											stroke='none'
											fill='url(#gradesLineAreaFill)'
											animationDuration={900}
											animationEasing='ease-out'
										/>
										<Line
											type='monotone'
											dataKey='grade'
											stroke='var(--color-accent)'
											strokeWidth={2.5}
											animationDuration={900}
											animationEasing='ease-out'
											dot={props => {
												const { cx, cy, payload } = props
												if (cx == null || cy == null || !payload) return null
												const isCurrent = currentGradeMonth && payload.month === currentGradeMonth
												return (
													<circle
														cx={cx}
														cy={cy}
														r={isCurrent ? 5 : 3.5}
														fill={isCurrent ? 'var(--color-accent)' : GRADE_BAR_INACTIVE}
														stroke='#fff'
														strokeWidth={2}
													/>
												)
											}}
											activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2, fill: 'var(--color-accent)' }}
										/>
									</ComposedChart>
								</ResponsiveContainer>
							</div>
						) : (
							<div className='h-[300px] w-full [&_svg]:outline-none [&_svg_*]:outline-none [&_svg_*]:focus:outline-none'>
								<ResponsiveContainer width='100%' height='100%'>
									<RechartsBarChart
										data={GRADES_BAR_DATA}
										margin={{ top: 8, right: 8, left: 0, bottom: 4 }}
										className='[&_svg]:outline-none [&_svg_*]:outline-none'
									>
										<CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' vertical={false} />
										<XAxis dataKey='month' tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
										<YAxis
											domain={[0, 5]}
											ticks={[0, 1, 2, 3, 4, 5]}
											tick={{ fill: '#6b7280', fontSize: 12 }}
											axisLine={false}
											tickLine={false}
											width={36}
											allowDecimals={false}
										/>
										<Tooltip
											animationDuration={110}
											animationEasing='ease-out'
											cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
											content={GradesBarTooltip}
											wrapperStyle={{ transition: 'transform 90ms ease-out' }}
										/>
										<Bar
											dataKey='grade'
											fill='var(--color-accent)'
											radius={[6, 6, 0, 0]}
											maxBarSize={48}
											activeBar={false}
											stroke='none'
											animationDuration={650}
											animationEasing='ease-out'
										>
											{GRADES_BAR_DATA.map(entry => (
												<Cell
													key={entry.month}
													fill={currentGradeMonth && currentGradeMonth === entry.month ? 'var(--color-accent)' : GRADE_BAR_INACTIVE}
												/>
											))}
										</Bar>
									</RechartsBarChart>
								</ResponsiveContainer>
							</div>
						)}
					</div>
				</section>
			</div>

			<div className='grid h-[600px] grid-cols-1 gap-4 lg:grid-cols-3 lg:items-start'>
				<YourRewards />
				<Leaderboard />
				<ScheduledExams />
			</div>

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
