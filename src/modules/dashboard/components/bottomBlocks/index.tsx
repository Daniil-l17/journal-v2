'use client'

import { FC, useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { move } from '@dnd-kit/helpers'
import Cookies from 'js-cookie'

import { YourRewards } from './yourRewards'
import { Leaderboard } from './leaderboard'
import { ScheduledExams } from './scheduledExams'

import type { BottomBlockId, Props } from './typed'
import { DASHBOARD_BOTTOM_BLOCKS_ORDER_COOKIE } from '../../constants'

export const BottomBlocks: FC<Props> = ({ bottomBlocksOrder }) => {
	const [order, setOrder] = useState<BottomBlockId[]>(bottomBlocksOrder)

	return (
		<DragDropProvider
			onDragEnd={event =>
				setOrder(prev => {
					const newOrder = move(prev, event)
					Cookies.set(DASHBOARD_BOTTOM_BLOCKS_ORDER_COOKIE, JSON.stringify(newOrder))
					return newOrder
				})
			}
		>
			<div className='grid h-[600px] grid-cols-1 gap-4 lg:grid-cols-3 lg:items-start'>
				{order.map((blockId, index) => {
					if (blockId === 'yourRewards') return <YourRewards key={blockId} sortableIndex={index} />
					if (blockId === 'leaderboard') return <Leaderboard key={blockId} sortableIndex={index} />
					return <ScheduledExams key={blockId} sortableIndex={index} />
				})}
			</div>
		</DragDropProvider>
	)
}
