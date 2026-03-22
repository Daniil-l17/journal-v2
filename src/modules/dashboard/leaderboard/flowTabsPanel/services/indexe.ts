import { instance } from '@/src/config/client'
import { LeaderFlowResponse } from './typed'

export const leaderboardFlowService = {
	getLeaderFlow: async () => {
		const { data } = await instance.get<LeaderFlowResponse>('/api/dashboard/progress/leader-stream')
		return data
	}
}
