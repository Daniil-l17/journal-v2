import { instance } from '@/src/config/client'
import type { GradeVisitsResponse, HistorySpecsResponse, ScheduleOperationsResponse } from './typed'

export const dashboardService = {
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
	},

	getGrades: async (specId?: number) => {
		const { data } = await instance.get<GradeVisitsResponse>('/api/dashboard/grades', {
			params: specId != null ? { spec: specId } : undefined
		})
		return data
	},

	getHistorySpecs: async () => {
		const { data } = await instance.get<HistorySpecsResponse>('/api/dashboard/history-specs')
		return data
	}
}
