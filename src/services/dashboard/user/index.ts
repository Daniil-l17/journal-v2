import { instance } from '@/src/config'
import type { UserInfo } from './typed'

export const settingsService = {
	getUserInfo: async (): Promise<UserInfo> => {
		const { data } = await instance.get<UserInfo>('/api/settings/user-info')
		return data
	}
}
