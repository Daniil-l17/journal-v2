'use client'

import { useQuery } from '@tanstack/react-query'
import { AsyncContent } from '@/src/modules/dashboard/components/asyncContent'
import { paymentsService } from '@/src/modules/dashboard/screens/payments/services'
import { TableHistory } from '@/src/modules/dashboard/screens/payments/tableHistory'
import { TableSchedule } from '@/src/modules/dashboard/screens/payments/tableSchedule'

export const Payments = () => {
	const scheduleQuery = useQuery({
		queryKey: ['payment-operations-schedule'],
		queryFn: () => paymentsService.getSchedule()
	})

	const historyQuery = useQuery({
		queryKey: ['payment-operations-history'],
		queryFn: () => paymentsService.getHistory()
	})

	const schedule = scheduleQuery.data ?? []
	const history = historyQuery.data ?? []
	const isLoading = scheduleQuery.isLoading || historyQuery.isLoading
	const isError = scheduleQuery.isError || historyQuery.isError
	const isEmpty = !schedule.length && !history.length

	return (
		<div className='flex min-h-0 w-full min-w-0 flex-col gap-6 max-lg:gap-5 max-sm:gap-4'>
			<AsyncContent isLoading={isLoading} isError={isError} isEmpty={isEmpty}>
				<div className='grid min-h-0 w-full min-w-0 grid-cols-2 gap-6 max-lg:grid-cols-1 max-lg:gap-2'>
					<TableHistory data={history} />
					<TableSchedule data={schedule} />
				</div>
			</AsyncContent>
		</div>
	)
}
