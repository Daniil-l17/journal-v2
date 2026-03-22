'use client'

import { Loader, Select, Tooltip } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { gsap } from 'gsap'
import { dashboardService } from '@/src/services/dashboard'
import type { GradeVisitItem } from '@/src/services/dashboard/typed'

type GradeEventType = 'absence' | 'late' | 'grade' | 'homework' | 'lab' | 'classwork' | 'test' | 'practice' | 'final'

type LegendItem = {
	type: GradeEventType
	label: string
	bg: string
	group: 'status' | 'mark'
}

type DayCell = {
	id: number
	date: string
	score: number
	events: { type: GradeEventType; count: number }[]
	status: 'red' | 'yellow' | 'default'
	subject: string
	pair: number
	teacher: string
	topic: string
}

const LEGEND: LegendItem[] = [
	{ type: 'absence', label: 'Пропуск', bg: 'bg-pink-200', group: 'status' },
	{ type: 'late', label: 'Опоздание', bg: 'bg-yellow-200', group: 'status' },
	{ type: 'homework', label: 'Домашние задания', bg: 'bg-rose-600', group: 'mark' },
	{ type: 'classwork', label: 'Классная работа', bg: 'bg-cyan-700', group: 'mark' },
	{ type: 'lab', label: 'Лабораторные работы', bg: 'bg-violet-300', group: 'mark' },
	{ type: 'test', label: 'Контрольные работы', bg: 'bg-emerald-300', group: 'mark' },
	{ type: 'practice', label: 'Практические работы', bg: 'bg-orange-400', group: 'mark' },
	{ type: 'final', label: 'Итоговая контрольная', bg: 'bg-indigo-700', group: 'mark' }
]

const BADGE_BG: Record<GradeEventType, string> = {
	absence: 'bg-rose-500',
	late: 'bg-amber-500',
	grade: 'bg-sky-500',
	homework: 'bg-rose-600',
	lab: 'bg-violet-400',
	classwork: 'bg-cyan-700',
	test: 'bg-emerald-400',
	practice: 'bg-orange-500',
	final: 'bg-indigo-700'
}

const mapVisitsToDays = (data: GradeVisitItem[]): DayCell[] => {
	const total = data.length

	return data.map((item, index) => {
		const date = new Date(item.date_visit)

		const events: { type: GradeEventType; count: number }[] = []

		const pushMark = (value: number | null | undefined, type: GradeEventType) => {
			if (value == null || value === 0) return
			events.push({ type, count: value })
		}

		pushMark(item.home_work_mark, 'homework')
		pushMark(item.lab_work_mark, 'lab')
		pushMark(item.class_work_mark, 'classwork')
		pushMark(item.control_work_mark, 'test')
		pushMark(item.practical_work_mark, 'practice')
		pushMark(item.final_work_mark, 'final')

		const limitedEvents = events.slice(0, 2)

		let status: DayCell['status'] = 'default'
		if (item.status_was === 0) status = 'red'
		else if (item.status_was === 2) status = 'yellow'

		return {
			id: index,
			date: date.toLocaleDateString('ru-RU'),
			score: total - index,
			events: limitedEvents,
			status,
			subject: item.spec_name,
			pair: item.lesson_number,
			teacher: item.teacher_name,
			topic: item.lesson_theme
		}
	})
}

const ALL_SPEC_VALUE = '__all__'

export default function Grades() {
	const [selectedSpecId, setSelectedSpecId] = useState<string>(ALL_SPEC_VALUE)

	const { data: specsData } = useQuery({
		queryKey: ['history-specs'],
		queryFn: () => dashboardService.getHistorySpecs()
	})

	const specIdParam = selectedSpecId === ALL_SPEC_VALUE || !selectedSpecId ? undefined : Number(selectedSpecId)

	const { data, isLoading, isError } = useQuery({
		queryKey: ['grades', specIdParam],
		queryFn: () => dashboardService.getGrades(specIdParam)
	})

	const days = data ? mapVisitsToDays(data) : []

	const subjectSelectData = useMemo(() => {
		if (!specsData) return [{ value: ALL_SPEC_VALUE, label: 'Все предметы' }]
		return [{ value: ALL_SPEC_VALUE, label: 'Все предметы' }, ...specsData.map(s => ({ value: String(s.id), label: `${s.name}` }))]
	}, [specsData])

	return (
		<div className='flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm'>
			<div className='shrink-0 border-b border-gray-100 px-4 pt-4 pb-4 max-md:px-3 max-md:pt-3 max-md:pb-2'>
				<div className='mb-4 flex items-end flex-col gap-3 max-md:mb-2 max-md:gap-2 '>
					<Select
						placeholder='Предмет'
						data={subjectSelectData}
						value={selectedSpecId}
						onChange={v => setSelectedSpecId(v ?? ALL_SPEC_VALUE)}
						size='sm'
						className='w-full min-w-[140px] max-w-[380px] max-md:min-w-0 max-md:max-w-full'
						classNames={{ input: 'rounded-lg' }}
					/>
				</div>
				<div className='flex flex-col gap-3 max-md:gap-2 md:flex-row md:items-center md:justify-between'>
					<div className='flex flex-wrap items-center gap-2'>
						{LEGEND.filter(item => item.group === 'status').map(item => (
							<div
								key={item.type}
								className='flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-1 shadow-sm max-md:px-2 max-md:py-1'
							>
								<span className={`h-3 w-3 rounded-sm max-md:h-2.5 max-md:w-2.5 ${item.bg}`} />
								<span className='text-sm font-semibold text-gray-900 max-md:text-xs'>{item.label}</span>
							</div>
						))}
					</div>

					<div className='flex flex-wrap items-center gap-2'>
						<span className='text-sm font-bold text-gray-900 max-md:text-xs'>Оценка:</span>
						{LEGEND.filter(item => item.group === 'mark').map(item => (
							<div
								key={item.type}
								className='flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-1 shadow-sm max-md:px-2 max-md:py-1'
							>
								<span className={`h-3 w-3 rounded-sm max-md:h-2.5 max-md:w-2.5 ${item.bg}`} />
								<span className='text-sm font-semibold text-gray-900 max-md:text-xs'>{item.label}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='flex-1 p-4 max-md:p-3'>
				{isLoading || isError ? (
					<div className='flex h-[70vh] w-full items-center justify-center max-md:h-[50vh]'>
						<Loader size='md' type='bars' />
					</div>
				) : (
					<div className='grid auto-rows-[110px] grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2 max-md:auto-rows-[88px] max-md:grid-cols-[repeat(auto-fill,minmax(72px,1fr))] max-md:gap-1.5'>
						{days.map(day => (
							<Tooltip
								key={day.id}
								withArrow
								transitionProps={{ transition: 'scale', duration: 50 }}
								offset={-20}
								position='bottom'
								withinPortal
								label={
									<div className='min-w-[200px] max-w-[calc(100vw-2rem)] rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-lg md:min-w-80 md:px-5 md:py-4'>
										<div>
											<div className='text-base font-semibold text-gray-900 md:text-lg'>{day.subject}</div>
											<div className='mt-2 h-px bg-gray-200' />
										</div>
										<div className='mt-3 space-y-2'>
											<div>
												<div className='text-xs uppercase tracking-wide text-gray-400 md:text-sm'>Пара</div>
												<div className='text-sm font-medium text-gray-800 md:text-base'>{day.pair}</div>
											</div>
											<div>
												<div className='text-xs uppercase tracking-wide text-gray-400 md:text-sm'>Преподаватель</div>
												<div className='text-sm font-medium text-gray-800 md:text-base'>{day.teacher}</div>
											</div>
											<div>
												<div className='text-xs uppercase tracking-wide text-gray-400 md:text-sm'>Тема</div>
												<p className='mt-1 text-wrap text-sm text-gray-800 max-w-80 md:text-base'>{day.topic}</p>
											</div>
										</div>
									</div>
								}
								classNames={{
									tooltip: '!bg-transparent !rounded-xl !border-none !shadow-none !p-0'
								}}
							>
								<div
									className={`relative flex cursor-pointer flex-col justify-between rounded-lg px-2 py-2 shadow-sm transition-shadow duration-200 max-md:px-1.5 max-md:py-1.5 ${
										day.status === 'red' ? 'bg-pink-200' : day.status === 'yellow' ? 'bg-yellow-100' : 'bg-slate-100'
									}`}
									onMouseEnter={e => {
										gsap.to(e.currentTarget, { y: -4, duration: 0.2, ease: 'power1.out' })
									}}
									onMouseLeave={e => {
										gsap.to(e.currentTarget, { y: 0, duration: 0.2, ease: 'power1.inOut' })
									}}
								>
									<div className='flex items-start justify-center'>
										<span className='text-[10px] font-semibold text-gray-500 max-md:text-[9px]'>{day.date}</span>
									</div>
									<div className='flex flex-1 items-center justify-center'>
										<span className='text-xl font-semibold leading-none text-gray-800 max-md:text-base'>{day.score}</span>
									</div>
									<div className='pointer-events-none absolute bottom-1 right-1 flex flex-wrap justify-end gap-0.5 max-md:bottom-0.5 max-md:right-0.5'>
										{day.events.map(event => (
											<span
												key={event.type}
												className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold leading-none text-white max-md:h-4 max-md:w-4 max-md:text-[9px] ${BADGE_BG[event.type]}`}
											>
												{event.count}
											</span>
										))}
									</div>
								</div>
							</Tooltip>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
