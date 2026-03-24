import { instance } from '@/src/config/client'
import { LeaderGroupResponse } from './typed'

export const leaderboardGroupService = {
	getLeaderGroup: async () => {
		const { data } = await instance.get<LeaderGroupResponse>('/api/dashboard/progress/leader-group')
		return data
	}
}
