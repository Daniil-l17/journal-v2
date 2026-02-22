import { instance } from '@/src/config'
import { LoginDto, UserInfo } from '@/src/services/auth/typed'
import Cookies from 'js-cookie'

export const authService = {
	login: async (dto: LoginDto) => {
		try {
			const response = await instance.post('/api/auth/login', { ...dto, application_key: process.env.NEXT_PUBLIC_APPLICATION_KEY })
			Cookies.set('access_token', response.data.access_token)
			Cookies.set('refresh_token', response.data.refresh_token)
		} catch {
			throw new Error()
		}
	},
	getProfile: async (): Promise<UserInfo> => {
		const { data } = await instance.get<UserInfo>('/api/auth/profile')
		return data
	}
}
