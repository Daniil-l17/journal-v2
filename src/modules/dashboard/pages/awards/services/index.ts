import { instance } from '@/src/config/client'
import type { StudentAchievement } from './typed'

export const awardsService = {
	getStudentAchievements: async () => {
		const { data } = await instance.get<StudentAchievement[]>('/api/dashboard/profile/statistic/student-achievements')
		return data ?? []
	}
}
