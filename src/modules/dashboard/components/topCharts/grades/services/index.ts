import { instance } from '@/src/config/client'
import { GradeVisitsResponse } from './typed'

export const gradesService = {
	getGrades: async () => {
		const { data } = await instance.get<GradeVisitsResponse>('/api/dashboard/chart/average-progress')
		return data
	}
}
