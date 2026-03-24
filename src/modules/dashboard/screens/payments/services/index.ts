import { instance } from '@/src/config/client'
import type { PaymentHistoryItem, PaymentScheduleItem } from './typed'

export const paymentsService = {
	getSchedule: async () => {
		const { data } = await instance.get<PaymentScheduleItem[]>('/api/dashboard/payment/operations/schedule')
		return data ?? []
	},
	getHistory: async () => {
		const { data } = await instance.get<PaymentHistoryItem[]>('/api/dashboard/payment/operations/history')
		return data ?? []
	}
}
