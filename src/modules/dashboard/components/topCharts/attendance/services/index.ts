import { instance } from '@/src/config/client'
import { DashboardChartResponse } from '../../typed'

export const attendanceService = {
	getAttendance: async () => {
		const { data } = await instance.get<DashboardChartResponse>('/api/dashboard/chart/attendance')
		return data
	}
}
