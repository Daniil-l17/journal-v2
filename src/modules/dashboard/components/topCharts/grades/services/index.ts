import { instance } from '@/src/config/client'
import { DashboardChartResponse } from '../../typed'

export const gradesService = {
	getGrades: async () => {
		const { data } = await instance.get<DashboardChartResponse>('/api/dashboard/chart/average-progress')
		return data
	}
}
