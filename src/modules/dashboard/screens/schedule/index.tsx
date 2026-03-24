'use client'

import { Button } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { useQuery } from '@tanstack/react-query'
import { AsyncContent } from '@/src/components/asyncContent'
import { dashboardService } from '@/src/services/dashboard'
import type { ScheduleOperationItem } from '@/src/services/dashboard/typed'
import { formatDateRu } from '@/src/utils/format-dates'
import { getWeekMonday } from './utils'

function weekdayIntlKey(dayJsDay: number) {
	return dayJsDay === 0 ? 0 : dayJsDay
}

function WeekLessonCell({ item }: { item: ScheduleOperationItem | null }) {
	const intl = useIntl()
	const shell = 'relative flex min-h-[104px] flex-col rounded-md border border-gray-200 bg-white p-2 shadow-sm max-sm:min-h-[96px]'

	if (!item) {
		return (
			<div className={`${shell} items-center justify-center`}>
				<p className='px-1 text-center text-sm font-medium text-gray-500'>{intl.formatMessage({ id: 'schedule_no_lesson' })}</p>
			</div>
		)
	}

	return (
		<div className={shell}>
			<div className='pointer-events-none absolute top-2 right-2 max-w-[50%] text-right text-xs font-semibold leading-tight text-accent'>
				{item.room_name}
			</div>
			<div className='flex min-w-0 flex-col gap-1'>
				<div className='flex items-center gap-1.5 text-sm text-gray-600'>
					<Clock size={16} className='shrink-0' />
					<span className='tabular-nums'>
						{item.started_at} — {item.finished_at}
					</span>
				</div>
				<p className='line-clamp-3 text-sm font-semibold leading-snug text-gray-900'>{item.subject_name}</p>
				<p className='line-clamp-3 text-sm leading-snug text-gray-600'>{item.teacher_name}</p>
			</div>
		</div>
	)
}

export const Schedule = () => {
	const intl = useIntl()
	const [weekMonday, setWeekMonday] = useState(() => getWeekMonday(dayjs()))
	const [pickerValue, setPickerValue] = useState<string | null>(() => getWeekMonday(dayjs()).format('YYYY-MM-DD'))

	const dateStart = weekMonday.format('YYYY-MM-DD')
	const dateEnd = weekMonday.add(6, 'day').format('YYYY-MM-DD')

	const { data, isLoading, isError } = useQuery({
		queryKey: ['schedule-week', dateStart, dateEnd],
		queryFn: () => dashboardService.getScheduleByWeek(dateStart, dateEnd)
	})

	const weekItems = useMemo(() => {
		if (!data?.length) return []
		return data.filter(row => row.date >= dateStart && row.date <= dateEnd)
	}, [data, dateStart, dateEnd])

	const lessonNumbers = useMemo(() => {
		const s = new Set<number>()
		for (const it of weekItems) {
			s.add(it.lesson)
		}
		return [...s].sort((a, b) => a - b)
	}, [weekItems])

	const dayColumns = useMemo(() => {
		return Array.from({ length: 7 }, (_, i) => {
			const d = weekMonday.add(i, 'day')
			return {
				dateStr: d.format('YYYY-MM-DD'),
				d
			}
		})
	}, [weekMonday])

	const lookup = useMemo(() => {
		const map = new Map<string, ScheduleOperationItem>()
		for (const it of weekItems) {
			map.set(`${it.date}|${it.lesson}`, it)
		}
		return map
	}, [weekItems])

	const weekRangeLabel = useMemo(() => {
		const s = weekMonday.locale('ru')
		const e = weekMonday.add(6, 'day').locale('ru')
		if (s.month() === e.month() && s.year() === e.year()) {
			const month = s.format('MMMM').toLowerCase()
			return `${month} ${s.date()} – ${e.date()}`
		}
		return `${s.format('D MMMM').toLowerCase()} – ${e.format('D MMMM').toLowerCase()}`
	}, [weekMonday])

	const isEmpty = !isLoading && !isError && lessonNumbers.length === 0
	const showGrid = !isLoading && !isError && lessonNumbers.length > 0

	const goPrevWeek = () => {
		const next = weekMonday.subtract(7, 'day')
		setWeekMonday(next)
		setPickerValue(next.format('YYYY-MM-DD'))
	}

	const goNextWeek = () => {
		const next = weekMonday.add(7, 'day')
		setWeekMonday(next)
		setPickerValue(next.format('YYYY-MM-DD'))
	}

	const handleShowWeek = () => {
		if (pickerValue) {
			const mon = getWeekMonday(dayjs(pickerValue))
			setWeekMonday(mon)
			setPickerValue(mon.format('YYYY-MM-DD'))
		}
	}

	return (
		<div className='flex min-h-0 w-full min-w-0 max-w-full flex-col gap-4 max-lg:gap-3'>
			<div className='flex flex-wrap items-center justify-between gap-3 rounded-md border border-gray-200 bg-white p-4 max-lg:flex-col max-lg:items-stretch max-sm:p-3'>
				<div className='flex shrink-0 items-center gap-2 max-lg:w-full max-lg:justify-between'>
					<Button
						type='button'
						variant='subtle'
						color='gray'
						onClick={goPrevWeek}
						aria-label={intl.formatMessage({ id: 'schedule_week_prev' })}
						styles={{ root: { height: 40, width: 40, minWidth: 40, padding: 0 } }}
						className='shrink-0'
					>
						<ChevronLeft size={22} />
					</Button>
					<span className='min-w-0 px-1 text-center text-base font-semibold text-gray-900 max-lg:flex-1 max-sm:text-sm'>
						{weekRangeLabel}
					</span>
					<Button
						type='button'
						variant='subtle'
						color='gray'
						onClick={goNextWeek}
						aria-label={intl.formatMessage({ id: 'schedule_week_next' })}
						styles={{ root: { height: 40, width: 40, minWidth: 40, padding: 0 } }}
						className='shrink-0'
					>
						<ChevronRight size={22} />
					</Button>
				</div>

				<div className='flex min-w-0 flex-wrap items-center justify-end gap-2 max-lg:w-full max-lg:justify-between'>
					<label htmlFor='schedule-week-date' className='flex shrink-0 items-center text-sm font-medium text-gray-700'>
						{intl.formatMessage({ id: 'schedule_date_label' })}
					</label>
					<DateInput
						id='schedule-week-date'
						value={pickerValue}
						onChange={setPickerValue}
						valueFormat='YYYY-MM-DD'
						locale='ru'
						size='sm'
						className='w-[180px] max-w-[180px] max-lg:min-w-[140px] max-lg:flex-1 max-sm:max-w-none'
					/>
					<Button type='button' color='primary' size='sm' onClick={handleShowWeek} className='max-sm:w-full'>
						{intl.formatMessage({ id: 'schedule_show' })}
					</Button>
				</div>
			</div>

			<AsyncContent isLoading={isLoading} isError={isError} isEmpty={isEmpty} />

			{showGrid ? (
				<div className='min-h-0 min-w-0 flex-1 overflow-hidden'>
					<div
						className='schedule-grid-scroll h-full w-full min-w-0 overflow-y-hidden pb-1'
						style={{
							overflowX: 'auto',
							WebkitOverflowScrolling: 'touch'
						}}
					>
						<div className='flex w-max min-w-max flex-col gap-2'>
							<div className='grid gap-2' style={{ gridTemplateColumns: 'repeat(7, 249px)' }}>
								{dayColumns.map(col => {
									const wk = weekdayIntlKey(col.d.day())
									return (
										<div
											key={col.dateStr}
											className='flex min-h-18 flex-col items-center justify-center rounded-md border border-accent/20 bg-accent px-2 py-2.5 text-center font-semibold text-white max-sm:px-1.5 max-sm:py-2'
										>
											<span className='text-base leading-tight max-sm:text-sm'>{intl.formatMessage({ id: `schedule_weekday_${wk}` })}</span>
											<span className='mt-1.5 text-sm font-medium text-white/95 max-sm:text-xs'>
												{formatDateRu(col.dateStr, 'DD.MM.YYYY')}
											</span>
										</div>
									)
								})}
							</div>

							{lessonNumbers.map(lesson => (
								<div key={lesson} className='grid gap-2' style={{ gridTemplateColumns: 'repeat(7, 249px)' }}>
									{dayColumns.map(col => {
										const item = lookup.get(`${col.dateStr}|${lesson}`) ?? null
										return <WeekLessonCell key={`${lesson}-${col.dateStr}`} item={item} />
									})}
								</div>
							))}
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}
