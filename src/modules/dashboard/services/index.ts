import { instance } from '@/src/config/client'
import { ScheduleOperationsResponse, UserInfo } from './typed'

export const dashboardService = {
	getProfile: async () => {
		const { data } = await instance.get<UserInfo>('/api/auth/profile')
		return data
	},
	getScheduleForMonth: async (dateFilter: string) => {
		const { data } = await instance.get<ScheduleOperationsResponse>('/api/dashboard/schedule/by-month', {
			params: { date_filter: dateFilter }
		})
		return data
	},

	getScheduleByDate: async (dateFilter: string) => {
		const { data } = await instance.get<ScheduleOperationsResponse>('/api/dashboard/schedule/by-date', {
			params: { date_filter: dateFilter }
		})
		return data
	},

	getScheduleByWeek: async (dateStart: string, dateEnd: string) => {
		const { data } = await instance.get<ScheduleOperationsResponse>('/api/dashboard/schedule/by-range', {
			params: { date_start: dateStart, date_end: dateEnd }
		})
		return data
	}
}
