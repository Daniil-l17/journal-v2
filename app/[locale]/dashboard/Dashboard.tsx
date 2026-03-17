'use client'

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { Avatar, Tabs } from '@mantine/core'
import { Heatmap } from '@mantine/charts'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import Image from 'next/image'
import { ChevronRight, Code2 } from 'lucide-react'
import { useProfile } from '@/src/hooks/useProfile'
import { Schedule } from '@/src/modules/dashboard/schedule'
import { dashboardService } from '@/src/services/dashboard'
import type { GradeVisitItem } from '@/src/services/dashboard/typed'

const AWARDS_MOCK = [
	{ id: 1, date: '06.03.2026', description: 'Посещение пары', points: 1 },
	{ id: 2, date: '05.03.2026', description: 'Своевременное выполнение домашнего задания', points: 1 },
	{ id: 3, date: '04.03.2026', description: 'Посещение пары', points: 1 },
	{ id: 4, date: '03.03.2026', description: 'Активная работа на семинаре', points: 1 },
	{ id: 5, date: '02.03.2026', description: 'Посещение пары', points: 1 },
	{ id: 6, date: '01.03.2026', description: 'Своевременная сдача проекта', points: 1 },
	{ id: 7, date: '01.03.2026', description: 'Своевременная сдача проекта', points: 1 },
	{ id: 8, date: '01.03.2026', description: 'Своевременная сдача проекта', points: 1 },
	{ id: 9, date: '01.03.2026', description: 'Своевременная сдача проекта', points: 1 },
	{ id: 10, date: '01.03.2026', description: 'Своевременная сдача проекта', points: 1 }
]

const REVIEWS_MOCK = [
	{
		id: 1,
		author: 'Гайдук Илья Евгеньевич',
		subject: 'Индивидуальный проект РПО',
		date: '18.10.2025',
		text: 'Даниил имеет учебный потенциал и наверняка сможет его раскрыть, если начнет уделять время выполнению домашних работ. Лекции слушает внимательно, отлично усваивает темы.'
	},
	{
		id: 2,
		author: 'Иванова Мария Петровна',
		subject: 'Математика',
		date: '15.10.2025',
		text: 'Успеваемость удовлетворительная, но нестабильная. Для улучшения результатов необходимо развивать самодисциплину и регулярно повторять материал.'
	},
	{
		id: 3,
		author: 'Сидоров Алексей Викторович',
		subject: 'Физика РПО',
		date: '12.10.2025',
		text: 'Даниил внимательный студент, который проявляет хорошие способности к рассуждению над задачами. Советую не стесняться брать инициативу в свои руки и выходить к доске.'
	},
	{
		id: 4,
		author: 'Иванова Мария Петровна',
		subject: 'Математика',
		date: '15.10.2025',
		text: 'Успеваемость удовлетворительная, но нестабильная. Для улучшения результатов необходимо развивать самодисциплину и регулярно повторять материал.'
	},
	{
		id: 5,
		author: 'Сидоров Алексей Викторович',
		subject: 'Физика РПО',
		date: '12.10.2025',
		text: 'Даниил внимательный студент, который проявляет хорошие способности к рассуждению над задачами. Советую не стесняться брать инициативу в свои руки и выходить к доске.'
	},
	{
		id: 6,
		author: 'Сидоров Алексей Викторович',
		subject: 'Физика РПО',
		date: '12.10.2025',
		text: 'Даниил внимательный студент, который проявляет хорошие способности к рассуждению над задачами. Советую не стесняться брать инициативу в свои руки и выходить к доске.'
	}
]

const PAYMENTS_MOCK = [
	{ id: 1, dueDate: '01.08.2026', description: 'За 3 Семестр', amount: 78140 },
	{ id: 2, dueDate: '01.01.2027', description: 'За 4 Семестр', amount: 78140 },
	{ id: 3, dueDate: '01.08.2027', description: 'За 5 Семестр', amount: 78140 },
	{ id: 4, dueDate: '01.01.2028', description: 'За 6 Семестр', amount: 78140 },
	{ id: 5, dueDate: '01.08.2028', description: 'За 7 Семестр', amount: 78140 },
	{ id: 6, dueDate: '01.01.2029', description: 'За 8 Семестр', amount: 78140 }
]

const LEADERBOARD_ITEMS = [
	{ rank: 1, name: 'Савин Владимир Антонович', score: 1849 },
	{ rank: 2, name: 'Козлова Анна Сергеевна', score: 1762 },
	{ rank: 3, name: 'Морозов Дмитрий Игоревич', score: 1698 },
	{ rank: 4, name: 'Волкова Елена Петровна', score: 1643 },
	{ rank: 5, name: 'Новиков Алексей Александрович', score: 1587 },
	{ rank: 6, name: 'Соколова Мария Викторовна', score: 1521 },
	{ rank: 7, name: 'Лебедев Иван Олегович', score: 1489 },
	{ rank: 8, name: 'Кузнецова Ольга Дмитриевна', score: 1422 },
	{ rank: 9, name: 'Попов Сергей Николаевич', score: 1387 },
	{ rank: 10, name: 'Федорова Татьяна Андреевна', score: 1345 },
	{ rank: 11, name: 'Иванов Иван Иванович', score: 1300 },
	{ rank: 12, name: 'Петрова Мария Ивановна', score: 1250 }
]

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

export default function Dashboard() {
	const params = useParams()
	const { data: profile } = useProfile()

	const [leaderboardFilter, setLeaderboardFilter] = useState<'group' | 'stream'>('group')

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

	return (
		<div className='grid grid-cols-[1fr_400px] gap-4'>
			<div className='grid grid-cols-2 gap-4'>
				<div className='col-span-2 flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
					<Tabs variant='pills' defaultValue='attendance' className='flex min-h-0 flex-1 flex-col'>
						<Tabs.List className='shrink-0 border-b border-gray-200 p-2'>
							<Tabs.Tab value='attendance' className='font-medium'>
								Посещаемость
							</Tabs.Tab>
							<Tabs.Tab value='grades' className='font-medium'>
								Оценки
							</Tabs.Tab>
						</Tabs.List>
						<Tabs.Panel value='attendance' className='flex flex-col flex-1 p-4 text-gray-600'>
							<div className='mb-3 flex items-end justify-between gap-3'>
								<div>
									<div className='text-lg font-semibold leading-snug text-gray-800'>Посещаемость за учебный год</div>
									<div className='mt-1 text-sm text-gray-500'>
										{total === 0 ? 'Нет данных по посещаемости' : `Посещено ${attended} из ${total} занятий (${attendancePercent}%)`}
									</div>
								</div>
							</div>
							<div className='flex min-h-0 flex-1 flex-col'>
								{isVisitsLoading || isVisitsError ? (
									<div className='flex flex-1 items-center justify-center text-sm text-gray-500'>Загружаем посещаемость…</div>
								) : (
									<div className='w-full flex-1'>
										<Heatmap
											data={heatmapData}
											startDate={startDate}
											endDate={endDate}
											withTooltip
											withWeekdayLabels
											withMonthLabels
											rectSize={16}
											rectRadius={3}
											gap={4}
											weekdayLabels={['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']}
											monthLabels={['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']}
											getTooltipLabel={({ date, value }) =>
												`${dayjs(date).locale('ru').format('D MMM YYYY')} – ${
													value === null || value === 0
														? 'Нет посещений'
														: `${value} ${value === 1 ? 'посещение' : value < 5 ? 'посещения' : 'посещений'}`
												}`
											}
											classNames={{ root: 'w-full' }}
										/>
									</div>
								)}
							</div>
						</Tabs.Panel>
						<Tabs.Panel value='grades' className='flex flex-1 items-center justify-center p-4 text-base text-gray-600'>
							Раздел «Оценки» — в разработке
						</Tabs.Panel>
					</Tabs>
				</div>

				<div className='flex flex-col h-[950px] gap-4'>
					<div className='flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
						<div className='shrink-0 border-b border-gray-100 px-4 pt-4 pb-3'>
							<h3 className='text-lg font-bold leading-snug text-gray-900'>Ваши награды</h3>
						</div>
						<div className='flex-1 overflow-hidden pl-4 pr-4 py-3'>
							<ul className='flex h-full flex-1 flex-col space-y-4 overflow-y-auto pr-5'>
								{AWARDS_MOCK.map(({ id, date, description, points }) => (
									<li key={id} className='flex items-start justify-between gap-3 leading-relaxed'>
										<div className='min-w-0 flex-1'>
											<div className='text-sm text-gray-600'>{date}</div>
											<div className='mt-1 text-base font-medium text-gray-900'>{description}</div>
										</div>
										<div className='flex shrink-0 items-center gap-1.5'>
											<span className='text-base font-semibold text-gray-900'>+{points}</span>
											<Image src='/header/TOPCOINS.png' alt='' width={18} height={18} className='object-contain' aria-hidden />
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className='flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
						<div className='shrink-0 border-b border-gray-100 px-4 pt-4 pb-3'>
							<h3 className='text-lg font-bold leading-snug text-gray-900'>Отзывы о студенте</h3>
						</div>
						<div className='flex-1 overflow-hidden pl-4 pr-4 py-3'>
							<ul className='flex flex-1 h-full flex-col space-y-5 overflow-y-auto pr-5'>
								{REVIEWS_MOCK.map(({ id, author, subject, date, text }) => (
									<li key={id} className='leading-relaxed'>
										<div className='flex items-start justify-between gap-2'>
											<span className='min-w-0 flex-1 text-base font-bold text-gray-900'>
												{author} ({subject})
											</span>
											<span className='shrink-0 text-sm text-gray-500'>{date}</span>
										</div>
										<p className='mt-1.5 pl-0 text-sm text-gray-700 leading-relaxed'>{text}</p>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<div className='flex h-[950px] flex-col gap-4 col-start-2'>
					<div className='h-[550px] flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
						<div className='shrink-0 border-b border-gray-100 px-4 pt-4 pb-3'>
							<div className='flex items-center justify-between gap-2'>
								<h3 className='font-bold text-lg tracking-wide leading-snug text-gray-900'>Таблица лидеров</h3>
							</div>
						</div>
						<div className='flex-1 pl-2 pr-4 overflow-hidden py-3'>
							<ul className='space-y-4.5 pr-5 h-full flex flex-col flex-1 overflow-y-auto'>
								{LEADERBOARD_ITEMS.map(({ rank, name, score }) => (
									<li key={rank} className='flex items-center gap-3 leading-relaxed'>
										<span className='w-8 shrink-0 text-right text-base font-medium text-gray-600'>{rank}.</span>
										<Avatar src={profile?.photo} alt={name} radius='xl' size={36} className='shrink-0' />
										<span className='min-w-0 flex-1 text-base font-medium text-gray-900'>{name}</span>
										<div className='flex shrink-0 items-center gap-1.5'>
											<span className='text-base font-semibold text-gray-700'>{score}</span>
											<Image src='/header/TOPMONEY.png' alt='' width={16} height={16} className='object-contain' />
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div
						className='group relative flex flex-1 cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 ease-out hover:scale-[1.01] hover:shadow-md'
						role='button'
						tabIndex={0}
					>
						<Code2
							className='absolute bottom-4 left-4 h-16 w-16 -rotate-12 text-teal-200/40 transition-transform duration-200 group-hover:scale-110'
							aria-hidden
						/>
						<Code2
							className='absolute bottom-6 right-6 h-12 w-12 rotate-6 text-teal-200/30 transition-transform duration-200 group-hover:scale-110'
							aria-hidden
						/>
						<div className='relative flex flex-1 flex-col items-center justify-center gap-5 px-6 py-10'>
							<Code2
								className='h-14 w-14 shrink-0 text-teal-500 transition-transform duration-200 group-hover:scale-110'
								strokeWidth={1.5}
								aria-hidden
							/>
							<div className='flex items-center gap-2.5'>
								<span className='text-base font-medium text-gray-900'>Технологии проекта</span>
								<span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white transition-all duration-200 group-hover:bg-teal-600 group-hover:scale-110'>
									<ChevronRight size={18} strokeWidth={2.5} />
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Schedule />
		</div>
	)
}
