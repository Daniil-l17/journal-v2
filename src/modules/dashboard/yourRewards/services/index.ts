import { instance } from '@/src/config/client'
import type { ActivityResponse } from './typed'

export const yourRewardsService = {
	getActivity: async () => {
		const { data } = await instance.get<ActivityResponse>('/api/dashboard/progress/activity')
		return data
	}
}
