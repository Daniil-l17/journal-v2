'use client'

import { Calendar, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Button, Popover, Skeleton } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useIntl } from 'react-intl'
import { dashboardService } from '@/src/services/dashboard'
import { ScheduleLessonCard } from './scheduleLessonCard'

export const Schedule = () => {
	const intl = useIntl()
	const params = useParams()

	function startOfDay(d: Date) {
		const out = new Date(d)
		out.setHours(0, 0, 0, 0)
		return out
	}

	const today = startOfDay(new Date())
	const [selectedDate, setSelectedDate] = useState<Date>(today)
	const [calendarOpen, setCalendarOpen] = useState(false)

	const monthsGenitive = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => intl.formatMessage({ id: `schedule_month_${m}` }))
	const weekdays = [0, 1, 2, 3, 4, 5, 6].map(d => intl.formatMessage({ id: `schedule_weekday_${d}` }))

	const dayOfWeek = weekdays[selectedDate.getDay()]
	const isToday = selectedDate.getTime() === today.getTime()

	function formatDateRu(d: Date) {
		return `${d.getDate()} ${monthsGenitive[d.getMonth()]} ${d.getFullYear()}`
	}

	const dateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`

	const { data, isLoading, isError } = useQuery({
		queryKey: ['schedule', dateString],
		queryFn: () => dashboardService.getScheduleByDate(dateString)
	})

	const goPrevDay = () => {
		const d = new Date(selectedDate)
		d.setDate(d.getDate() - 1)
		setSelectedDate(d)
	}
	const goNextDay = () => {
		const d = new Date(selectedDate)
		d.setDate(d.getDate() + 1)
		setSelectedDate(d)
	}

	const handleCalendarSelect = (value: string | null) => {
		if (value) {
			setSelectedDate(startOfDay(new Date(value)))
			setCalendarOpen(false)
		}
	}

	const titleText = isToday
		? intl.formatMessage({ id: 'schedule_today_title' })
		: intl.formatMessage({ id: 'schedule_date_title' }, { date: selectedDate.toLocaleDateString('ru-RU') })

	return (
		<div className='flex h-[680px] flex-col sticky bottom-0 top-[104px] rounded-xl border border-gray-200 bg-white shadow-sm'>
			<div className='shrink-0 border-b border-gray-100 p-4'>
				<div className='flex flex-col gap-3'>
					<div className='flex items-center gap-2'>
						<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent'>
							<Calendar size={18} strokeWidth={2.5} />
						</div>
						<div className='min-w-0 flex-1'>
							<h3 className='truncate text-base font-semibold tracking-tight text-gray-900'>{titleText}</h3>
							<p className='text-xs text-gray-500'>{isToday ? <span className='font-medium text-accent'>{dayOfWeek}</span> : dayOfWeek}</p>
						</div>
						<Link
							href={`/${params.locale}/schedule`}
							className='flex shrink-0 items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-accent/80'
						>
							{intl.formatMessage({ id: 'more_info' })}
							<ChevronRight size={16} />
						</Link>
					</div>
					<div className='flex flex-wrap items-stretch gap-2'>
						<div className='flex min-w-0 flex-1 items-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
							<Button
								variant='subtle'
								color='gray'
								onClick={goPrevDay}
								aria-label={intl.formatMessage({ id: 'schedule_prev_day' })}
								styles={{ root: { height: 40, width: 40, minWidth: 40, padding: 0 } }}
								className='shrink-0'
							>
								<ChevronLeft size={20} />
							</Button>
							<span className='min-w-0 flex-1 px-3 py-2 text-center text-sm font-medium leading-tight text-gray-800'>
								{formatDateRu(selectedDate)}
							</span>
							<Button
								variant='subtle'
								color='gray'
								onClick={goNextDay}
								aria-label={intl.formatMessage({ id: 'schedule_next_day' })}
								styles={{ root: { height: 40, width: 40, minWidth: 40, padding: 0 } }}
								className='shrink-0'
							>
								<ChevronRight size={20} />
							</Button>
						</div>
						<Popover opened={calendarOpen} onChange={setCalendarOpen} position='bottom-end' shadow='md' withArrow>
							<Popover.Target>
								<Button
									variant='light'
									color='gray'
									onClick={() => setCalendarOpen(o => !o)}
									aria-label={intl.formatMessage({ id: 'schedule_open_calendar' })}
									styles={{ root: { height: 40, width: 40, minWidth: 40, padding: 0 } }}
									className='shrink-0'
								>
									<CalendarDays size={20} className='text-gray-600' />
								</Button>
							</Popover.Target>
							<Popover.Dropdown>
								<DatePicker value={dateString} onChange={handleCalendarSelect} locale='ru' size='sm' hideWeekdays />
							</Popover.Dropdown>
						</Popover>
					</div>
				</div>
			</div>
			<div className='flex-1 overflow-y-auto p-4'>
				{isLoading ? (
					<div className='flex flex-col gap-3'>
						{Array.from({ length: 4 }).map((_, i) => (
							<Skeleton key={i} height={102} radius='md' />
						))}
					</div>
				) : isError ? (
					<div className='flex flex-col items-center justify-center gap-2 py-12 text-center'>
						<p className='text-sm font-medium text-red-600'>{intl.formatMessage({ id: 'schedule_load_error' })}</p>
						<p className='text-xs text-gray-500'>{intl.formatMessage({ id: 'schedule_load_error_hint' })}</p>
					</div>
				) : !data?.length ? (
					<div className='flex flex-col items-center justify-center py-12 text-center'>
						<p className='text-sm font-medium text-gray-600'>{intl.formatMessage({ id: 'schedule_empty' })}</p>
						<p className='mt-1 text-xs text-gray-500'>{intl.formatMessage({ id: 'schedule_empty_hint' })}</p>
					</div>
				) : (
					<div className='flex flex-col gap-3'>
						{data.map((item, i) => (
							<ScheduleLessonCard key={i} item={item} />
						))}
					</div>
				)}
			</div>
		</div>
	)
}
