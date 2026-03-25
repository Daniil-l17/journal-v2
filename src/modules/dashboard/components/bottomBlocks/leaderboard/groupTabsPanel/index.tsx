import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { Props } from './typed'
import { Avatar, Loader, Tabs, UnstyledButton } from '@mantine/core'
import { leaderboardGroupService } from './services'
import { IconWallet } from '@/src/modules/dashboard/components/iconWallet'

export const GroupTabsPanel: FC<Props> = ({ activeTab, setPhotoPreview }) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['dashboard-progress-leader-group'],
		queryFn: () => leaderboardGroupService.getLeaderGroup(),
		enabled: activeTab === 'group'
	})

	const leaderboardGroup = data ?? []

	return (
		<Tabs.Panel value='group' className='min-h-0 flex-1 py-3 px-2' keepMounted>
			{isLoading ? (
				<div className='flex min-h-[120px] flex-1 items-center justify-center'>
					<Loader type='bars' color='primary' />
				</div>
			) : isError ? (
				<div className='flex min-h-[120px] flex-1 items-center justify-center px-4 text-center text-sm text-gray-500'>
					Не удалось загрузить таблицу лидеров
				</div>
			) : !leaderboardGroup.length ? (
				<div className='flex min-h-[120px] flex-1 items-center justify-center px-4 text-sm text-gray-500'>Нет данных</div>
			) : (
				<ul className='flex min-h-0 flex-1 flex-col [scrollbar-gutter:stable] overflow-hidden overflow-y-auto gap-4 pr-4'>
					{leaderboardGroup.map(leaderboardGroupItem => {
						const name = leaderboardGroupItem.full_name
						const photo = leaderboardGroupItem.photo_path
						return (
							<li key={leaderboardGroupItem.id} className='flex items-center gap-3 leading-relaxed'>
								<span className='w-6 shrink-0 text-right text-base font-medium text-gray-600'>{leaderboardGroupItem.position}.</span>
								{photo ? (
									<UnstyledButton
										type='button'
										aria-label={`Открыть фото: ${name}`}
										onClick={() => setPhotoPreview({ src: photo ?? '', alt: name ?? '' })}
										className='shrink-0 cursor-pointer rounded-full outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'
									>
										<Avatar src={photo} alt='' radius='xl' size={36} />
									</UnstyledButton>
								) : (
									<Avatar src={undefined} alt={name ?? ''} radius='xl' size={36} className='shrink-0' />
								)}
								<span className='min-w-0 flex-1 text-base font-medium text-gray-900'>{name}</span>
								<div className='flex shrink-0 items-center gap-1.5'>
									<span className='text-base font-semibold text-gray-700'>{leaderboardGroupItem.amount}</span>
									<IconWallet type='TOPMONEY' size={16} />
								</div>
							</li>
						)
					})}
				</ul>
			)}
		</Tabs.Panel>
	)
}
