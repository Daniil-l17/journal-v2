'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Avatar } from '@mantine/core'
import Image from 'next/image'
import { useProfile } from '@/src/hooks/useProfile'
import { Schedule } from '@/src/components/dashboard/schedule'

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
	{ rank: 10, name: 'Федорова Татьяна Андреевна', score: 1345 }
]

export default function Dashboard() {
	const params = useParams()
	const { data: profile } = useProfile()

	const [leaderboardFilter, setLeaderboardFilter] = useState<'group' | 'stream'>('group')

	return (
		<div className='grid grid-cols-[1fr_400px] gap-4'>
			<div className='grid grid-cols-2 gap-4'>
				<div className='col-span-2 h-[500px] rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>Блок 1</div>

				<div className='flex flex-col h-[950px] gap-4'>
					<div className='flex-1 rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>Блок 2</div>
					<div className='flex-1 rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>Блок 3</div>
				</div>
				<div className='flex h-[550px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
					Блок 4
					{/*					<div className='shrink-0 border-b border-gray-100 px-4 pt-4 pb-3'>
						<div className='flex items-center justify-between gap-2'>
							<h3 className='text-lg font-bold uppercase tracking-wide text-gray-800'>Таблица лидеров</h3>
						</div>
					</div>
					<div className='min-h-0 flex-1 overflow-y-auto pl-2 pr-4 py-3'>
						<ul className='space-y-3'>
							{LEADERBOARD_ITEMS.map(({ rank, name, score }) => (
								<li key={rank} className='flex items-center gap-3'>
									<span className='w-7 shrink-0 text-right font-medium text-gray-500'>{rank}.</span>
									<Avatar src={profile?.photo} alt={name} radius='xl' size={36} className='shrink-0' />
									<span className='min-w-0 flex-1 text-lg text-gray-700'>{name}</span>
									<div className='flex shrink-0 items-center gap-1.5'>
										<span className='text-lg text-gray-500'>{score}</span>
										<Image src='/header/TOPMONEY.png' alt='' width={14} height={14} className='object-contain' />
									</div>
								</li>
							))}
						</ul>
					</div>*/}
				</div>
			</div>
			<Schedule />
		</div>
	)
}
