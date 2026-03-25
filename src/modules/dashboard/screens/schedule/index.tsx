'use client'

import { Button } from '@mantine/core'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import isoWeek from 'dayjs/plugin/isoWeek'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import { useQuery } from '@tanstack/react-query'

import { AsyncContent } from '@/src/modules/dashboard/components/asyncContent'
import { formatDateRu } from '@/src/utils/format-dates'
import { WeekLessonCell } from './weekLessonCell'
import { dashboardService } from '@/src/modules/dashboard/services'

dayjs.extend(isoWeek)

const COLUMN_WIDTH = 249

export const Schedule = () => {
	const intl = useIntl()
	const [weekMonday, setWeekMonday] = useState(() => dayjs().startOf('isoWeek'))

	const dateStart = weekMonday.format('YYYY-MM-DD')
	const dateEnd = weekMonday.add(6, 'day').format('YYYY-MM-DD')

	const { data, isLoading, isError } = useQuery({
		queryKey: ['schedule-week', dateStart],
		queryFn: () => dashboardService.getScheduleByWeek(dateStart, dateEnd)
	})

	const weekItems = data ?? []

	const lessonNumbers = Array.from(new Set(weekItems.map(it => it.lesson)))

	const dayColumns = Array.from({ length: 7 }, (_, i) => {
		const d = weekMonday.add(i, 'day')
		return { dateStr: d.format('YYYY-MM-DD'), d }
	})

	const weekRangeLabel = (() => {
		const s = weekMonday.locale('ru')
		const e = weekMonday.add(6, 'day').locale('ru')

		if (s.month() === e.month() && s.year() === e.year()) {
			return `${s.format('MMMM').toLowerCase()} ${s.date()} – ${e.date()}`
		}

		return `${s.format('D MMMM').toLowerCase()} – ${e.format('D MMMM').toLowerCase()}`
	})()

	const goPrevWeek = () => setWeekMonday(prev => prev.subtract(7, 'day'))
	const goNextWeek = () => setWeekMonday(prev => prev.add(7, 'day'))

	return (
		<div className='flex min-h-0 w-full flex-col gap-4 max-lg:gap-3'>
			<div className='flex flex-wrap items-center justify-between gap-3 rounded-md border border-gray-200 bg-white p-4 max-lg:flex-col max-lg:items-stretch max-sm:p-3'>
				<div className='grid h-10 w-full grid-cols-[40px_1fr_40px] items-center gap-3'>
					<Button
						variant='subtle'
						color='gray'
						onClick={goPrevWeek}
						disabled={isLoading}
						aria-label={intl.formatMessage({ id: 'schedule_week_prev' })}
						styles={{ root: { height: 40, width: 40, minWidth: 40, padding: 0 } }}
					>
						<ChevronLeft size={22} />
					</Button>

					<span className='text-center text-base font-semibold tabular-nums whitespace-nowrap text-gray-900 max-sm:text-sm'>
						{weekRangeLabel}
					</span>

					<Button
						variant='subtle'
						color='gray'
						onClick={goNextWeek}
						disabled={isLoading}
						aria-label={intl.formatMessage({ id: 'schedule_week_next' })}
						styles={{ root: { height: 40, width: 40, minWidth: 40, padding: 0 } }}
					>
						<ChevronRight size={22} />
					</Button>
				</div>
			</div>

			<AsyncContent isLoading={isLoading} isError={isError} isEmpty={!lessonNumbers.length} minHeight='60dvh'>
				<div className='flex-1 overflow-hidden'>
					<div className='schedule-grid-scroll w-full overflow-x-auto pb-1' style={{ WebkitOverflowScrolling: 'touch' }}>
						<div className='flex w-max flex-col gap-2'>
							<div className='grid gap-2' style={{ gridTemplateColumns: `repeat(7, ${COLUMN_WIDTH}px)` }}>
								{dayColumns.map(col => {
									const weekdayIndex = col.d.day()

									return (
										<div
											key={col.dateStr}
											className='flex min-h-18 flex-col items-center justify-center rounded-md border border-accent/20 bg-accent px-2 py-2.5 text-center font-semibold text-white'
										>
											<span className='text-base max-sm:text-sm'>
												{intl.formatMessage({
													id: `schedule_weekday_${weekdayIndex}`
												})}
											</span>

											<span className='mt-1.5 text-sm text-white/95 max-sm:text-xs'>{formatDateRu(col.dateStr, 'DD.MM.YYYY')}</span>
										</div>
									)
								})}
							</div>

							{lessonNumbers.map(lesson => (
								<div key={lesson} className='grid gap-2' style={{ gridTemplateColumns: `repeat(7, ${COLUMN_WIDTH}px)` }}>
									{dayColumns.map(col => {
										const lessonItem = weekItems.find(it => it.date === col.dateStr && it.lesson === lesson) ?? null

										return <WeekLessonCell key={`${lesson}-${col.dateStr}`} lesson={lessonItem} />
									})}
								</div>
							))}
						</div>
					</div>
				</div>
			</AsyncContent>
		</div>
	)
}
