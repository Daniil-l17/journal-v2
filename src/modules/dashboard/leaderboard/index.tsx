'use client'

import { useState } from 'react'
import { Tabs } from '@mantine/core'
import { ModalLeader } from './modalLeader'
import { GroupTabsPanel } from './groupTabsPanel'
import { FlowTabsPanel } from './flowTabsPanel'
import { LeaderboardTab } from './typed'

export const Leaderboard = () => {
	const [photoPreview, setPhotoPreview] = useState<{ src: string; alt: string } | null>(null)
	const [activeTab, setActiveTab] = useState<LeaderboardTab>('group')

	return (
		<section className='flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
			<ModalLeader photoPreview={photoPreview} setPhotoPreview={setPhotoPreview} />
			<Tabs
				value={activeTab}
				onChange={v => setActiveTab(v as LeaderboardTab)}
				variant='pills'
				color='primary'
				classNames={{
					root: 'flex min-h-0 flex-1 flex-col',
					list: 'ml-auto gap-2 border-0 bg-transparent p-0',
					tab: 'cursor-pointer text-sm font-medium'
				}}
				styles={{
					root: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 },
					list: { gap: 8, borderWidth: 0, background: 'transparent' },
					tab: { fontWeight: 500 },
					panel: { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }
				}}
			>
				<div className='flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-gray-100 px-4 py-4'>
					<h3 className='text-lg font-bold leading-snug text-gray-900'>Таблица лидеров</h3>
					<Tabs.List aria-label='Тип таблицы лидеров'>
						<Tabs.Tab value='group'>Группа</Tabs.Tab>
						<Tabs.Tab value='flow'>Поток</Tabs.Tab>
					</Tabs.List>
				</div>

				<GroupTabsPanel setPhotoPreview={setPhotoPreview} activeTab={activeTab} />
				<FlowTabsPanel setPhotoPreview={setPhotoPreview} activeTab={activeTab} />
			</Tabs>
		</section>
	)
}
