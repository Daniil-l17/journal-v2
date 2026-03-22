'use client'

import { Loader } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { List } from 'react-window'
import { yourRewardsService } from './services'
import { RewardRow } from './rewardRow'
import type { RewardRowData } from './rewardRow/typed'

export const YourRewards = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['dashboard-progress-activity'],
		queryFn: () => yourRewardsService.getActivity()
	})

	const rewards = data ?? []

	return (
		<section className='flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
			<div className='flex min-h-14 shrink-0 items-center border-b border-gray-100 px-4 py-3'>
				<h3 className='text-lg font-bold leading-snug text-gray-900'>Ваши награды</h3>
			</div>
			<div className='min-h-0 flex-1 py-3 pr-2 pl-4'>
				{isLoading ? (
					<div className='flex h-full min-h-[120px] items-center justify-center'>
						<Loader type='bars' color='primary' />
					</div>
				) : isError ? (
					<div className='flex h-full min-h-[120px] items-center justify-center px-2 text-center text-sm text-gray-500'>
						Не удалось загрузить награды
					</div>
				) : !rewards.length ? (
					<div className='flex h-full min-h-[120px] items-center justify-center px-2 text-sm text-gray-500'>Нет данных</div>
				) : (
					<List<RewardRowData, 'ul'>
						tagName='ul'
						className='h-full w-full [scrollbar-gutter:stable]'
						rowCount={rewards.length}
						rowHeight={66}
						rowProps={{ rewards }}
						rowComponent={RewardRow}
						style={{ height: '100%', width: '100%' }}
						defaultHeight={320}
						overscanCount={4}
					/>
				)}
			</div>
		</section>
	)
}
