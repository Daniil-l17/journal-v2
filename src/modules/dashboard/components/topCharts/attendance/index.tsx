'use client'

import { useRef, useState } from 'react'
import { Loader } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useSortable } from '@dnd-kit/react/sortable'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { GripVertical } from 'lucide-react'
import { attendanceService } from './services'
import { MONTHS_FULL_RU, MONTHS_SHORT_RU } from '../../../constants'

export const Attendance = ({ sortableIndex }: { sortableIndex: number }) => {
	const [element, setElement] = useState<Element | null>(null)
	const handleRef = useRef<HTMLSpanElement>(null)
	const { isDragging } = useSortable({
		id: 'attendance',
		index: sortableIndex,
		group: 'dashboard-top-charts',
		element,
		handle: handleRef
	})
	const { data, isLoading, isError } = useQuery({
		queryKey: ['dashboard-attendance-chart'],
		queryFn: () => attendanceService.getAttendance()
	})

	const chartData = (data ?? []).map(item => {
		const date = new Date(item.date)
		const monthIndex = date.getMonth()
		return {
			month: MONTHS_SHORT_RU[monthIndex] ?? item.date,
			monthFull: MONTHS_FULL_RU[monthIndex] ?? item.date,
			points: item.points
		}
	})

	const currentAttendance = chartData.length
		? `${(chartData.reduce((sum, item) => sum + item.points, 0) / chartData.length).toFixed(1)}%`
		: '—'

	return (
		<section
			ref={setElement}
			className={`flex min-h-[460px] flex-col rounded-lg border border-gray-200 bg-white shadow-sm${isDragging ? ' opacity-60' : ''}`}
		>
			<div className='flex shrink-0 items-center justify-between gap-2 border-b border-gray-100 px-4 pr-2 py-3'>
				<h3 className='min-w-0 text-lg font-bold leading-snug text-gray-900'>Посещаемость</h3>
				<span
					ref={handleRef}
					className='inline-flex shrink-0 cursor-grab touch-none select-none text-gray-400 hover:text-gray-600 active:cursor-grabbing'
					role='img'
					aria-label='Переместить блок «Посещаемость»'
				>
					<GripVertical size={18} strokeWidth={2.25} />
				</span>
			</div>

			{isLoading ? (
				<div className='flex flex-1 items-center justify-center p-4'>
					<Loader size='sm' type='bars' color='primary' />
				</div>
			) : (
				<>
					<div className='px-4 pt-4'>
						<div className='text-4xl leading-none font-bold text-accent'>{currentAttendance}</div>
						<div className='mt-1 text-sm font-medium text-gray-600'>Текущая посещаемость за учебный год</div>
					</div>

					<div className='mt-auto h-[300px] w-full pr-2 pb-2'>
						{isError || !chartData.length ? (
							<div className='flex h-full items-center justify-center px-4 text-center text-sm text-gray-500'>Нет данных для графика</div>
						) : (
							<ResponsiveContainer width='100%' height='100%'>
								<AreaChart data={chartData} margin={{ top: 12, right: 12, left: 0, bottom: 4 }}>
									<defs>
										<linearGradient id='attendanceAreaFill' x1='0' y1='0' x2='0' y2='1'>
											<stop offset='0%' stopColor='var(--color-accent)' stopOpacity={0.2} />
											<stop offset='100%' stopColor='var(--color-accent)' stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' vertical={false} />
									<XAxis dataKey='month' tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
									<YAxis
										domain={[0, 100]}
										ticks={[0, 20, 40, 60, 80, 100]}
										tick={{ fill: '#6b7280', fontSize: 12 }}
										axisLine={false}
										tickLine={false}
										width={40}
										allowDecimals={false}
									/>
									<Tooltip
										cursor={{ stroke: 'var(--color-accent)', strokeWidth: 1 }}
										contentStyle={{ borderRadius: 10, borderColor: '#e5e7eb' }}
										labelStyle={{ color: '#374151', fontWeight: 600 }}
										labelFormatter={(_, payload) => {
											const row = payload?.[0]?.payload as { monthFull?: string } | undefined
											return row?.monthFull ?? ''
										}}
										formatter={value => [`${String(value)}%`, 'Посещаемость']}
									/>
									<Area
										type='monotone'
										dataKey='points'
										stroke='var(--color-accent)'
										strokeWidth={2.5}
										fill='url(#attendanceAreaFill)'
										dot={{ r: 4, fill: 'var(--color-accent)', stroke: '#fff', strokeWidth: 2 }}
										activeDot={{ r: 6, fill: 'var(--color-accent)', stroke: '#fff', strokeWidth: 2 }}
									/>
								</AreaChart>
							</ResponsiveContainer>
						)}
					</div>
				</>
			)}
		</section>
	)
}
