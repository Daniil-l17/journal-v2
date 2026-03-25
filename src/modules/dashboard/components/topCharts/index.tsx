'use client'

import { FC, useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { move } from '@dnd-kit/helpers'
import { Attendance } from './attendance'
import { Grades } from './grades'
import { Props, TopChartId } from './typed'
import Cookies from 'js-cookie'
import { DASHBOARD_TOP_CHARTS_ORDER_COOKIE } from '../../constants'

export const TopCharts: FC<Props> = ({ topChartsOrder }) => {
	const [order, setOrder] = useState<TopChartId[]>(topChartsOrder)

	return (
		<DragDropProvider
			onDragEnd={event => {
				const newOrder = move(order, event)
				setOrder(newOrder)
				Cookies.set(DASHBOARD_TOP_CHARTS_ORDER_COOKIE, JSON.stringify(newOrder))
			}}
		>
			<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
				{order.map((chartId, index) =>
					chartId === 'attendance' ? <Attendance key={chartId} sortableIndex={index} /> : <Grades key={chartId} sortableIndex={index} />
				)}
			</div>
		</DragDropProvider>
	)
}
