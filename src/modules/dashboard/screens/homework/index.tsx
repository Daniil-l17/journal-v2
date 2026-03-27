'use client'

import { useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Button } from '@mantine/core'
import { FileCheck2 } from 'lucide-react'

import { AsyncContent } from '@/src/modules/dashboard/components/asyncContent'
import { homeworkService } from './services'
import type { HomeworkItem } from './services/typed'

const PAGE_SIZE = 6
const GROUP_ID = 2

type SectionKey = 'overdue' | 'checked' | 'review' | 'current' | 'deleted'

const SECTIONS: Array<{ key: SectionKey; title: string; status: 0 | 1 | 2 | 3; type: 0 | 5 }> = [
	{ key: 'overdue', title: 'Просрочено', status: 0, type: 0 },
	{ key: 'checked', title: 'Проверено', status: 1, type: 0 },
	{ key: 'review', title: 'На проверке', status: 2, type: 0 },
	{ key: 'current', title: 'Текущие', status: 3, type: 0 },
	{ key: 'deleted', title: 'Удалено преподавателем', status: 1, type: 5 }
]

const dateRu = (raw: string | null | undefined) => {
	if (!raw) return '—'
	// API gives YYYY-MM-DD or 'YYYY-MM-DD HH:mm:ss'
	const s = raw.trim()
	const [d] = s.split(' ')
	if (!d) return raw
	const [y, m, day] = d.split('-')
	if (!y || !m || !day) return raw
	return `${day}.${m}.${y}`
}

const footerTone = (status: number, type: number) => {
	if (type === 5) return 'bg-gray-700'
	if (status === 0) return 'bg-red-700'
	if (status === 1) return 'bg-emerald-700'
	if (status === 2) return 'bg-amber-700'
	return 'bg-blue-700'
}

function HomeworkCard({ item, status, type }: { item: HomeworkItem; status: number; type: number }) {
	const date = dateRu(item.completion_time)
	const tone = footerTone(status, type)

	return (
		<li className='flex h-[420px] w-[250px] shrink-0 flex-col overflow-hidden rounded-[2px] bg-white shadow-sm'>
			<div className='px-4 pt-4 pb-3'>
				<p className='truncate text-base font-semibold text-gray-900'>{item.name_spec}</p>
			</div>

			<div className='flex flex-1 items-center justify-center bg-gray-100/60'>
				<FileCheck2 size={76} strokeWidth={1.6} className='text-gray-300' />
			</div>

			<div className={`mt-auto px-4 py-2 text-white ${tone}`}>
				<p className='text-[11px] leading-none opacity-90'>Срок</p>
				<p className='mt-1 text-sm font-semibold tabular-nums'>{date}</p>
			</div>
		</li>
	)
}

function HomeworkSection({ title, status, type }: { title: string; status: 0 | 1 | 2 | 3; type: 0 | 5 }) {
	const query = useInfiniteQuery({
		queryKey: ['homework-list', status, type, GROUP_ID],
		queryFn: ({ pageParam }) =>
			homeworkService.getList({
				page: pageParam as number,
				status,
				type,
				group_id: GROUP_ID
			}),
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => (lastPage.length === PAGE_SIZE ? pages.length + 1 : undefined)
	})

	const items = useMemo(() => query.data?.pages.flat() ?? [], [query.data])
	const isEmpty = !query.isLoading && !query.isError && items.length === 0

	return (
		<section className='flex flex-col gap-4'>
			<div className='flex items-center justify-between gap-3'>
				<h3 className='text-xl font-bold text-gray-900'>{title}</h3>
			</div>

			<AsyncContent isLoading={query.isLoading} isError={query.isError} isEmpty={isEmpty} minHeight='20dvh'>
				<div className='flex flex-col gap-4'>
					<div className='-mx-2 overflow-x-auto px-2 pb-2'>
						<ul className='flex gap-4'>
							{items.map(it => (
								<HomeworkCard key={`${status}-${type}-${it.id}`} item={it} status={status} type={type} />
							))}
						</ul>
					</div>

					{query.hasNextPage ? (
						<div className='flex justify-center pt-2'>
							<Button
								onClick={() => query.fetchNextPage()}
								loading={query.isFetchingNextPage}
								disabled={!query.hasNextPage}
								variant='filled'
								color='primary'
								radius='md'
							>
								Показать ещё
							</Button>
						</div>
					) : null}
				</div>
			</AsyncContent>
		</section>
	)
}

export const Homework = () => {
	return (
		<div className='flex min-h-0 w-full flex-col gap-6'>
			{SECTIONS.map(s => (
				<HomeworkSection key={s.key} title={s.title} status={s.status} type={s.type} />
			))}
		</div>
	)
}
