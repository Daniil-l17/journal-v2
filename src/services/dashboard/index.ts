import { instance } from '@/src/config/client'
import type { GradeVisitsResponse, HistorySpecsResponse } from './typed'

export const dashboardService = {
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
