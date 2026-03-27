import { instance } from '@/src/config/client'
import { GradeVisitItem, HistorySpecsResponse } from './typed'

export const gradesService = {
	getGrades: async (specId?: number) => {
		const { data } = await instance.get<GradeVisitItem[]>('/api/dashboard/grades', {
			params: specId != null ? { spec: specId } : undefined
		})
		return data
	}
	,

	getHistorySpecs: async () => {
		const { data } = await instance.get<HistorySpecsResponse>('/api/dashboard/history-specs')
		return data
	}
}
