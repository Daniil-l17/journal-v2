import { instance } from '@/src/config'
import { LoginDto } from '@/src/services/auth/typed'
import Cookies from 'js-cookie'

export const authService = {
	login: async (dto: LoginDto) => {
		try {
			const response = await instance.post('/api/auth/login', { ...dto, application_key: process.env.NEXT_PUBLIC_APPLICATION_KEY })

			Cookies.set('access_token', response.data.access_token)
			Cookies.set('refresh_token', response.data.refresh_token)
		} catch (error: any) {
			throw new Error(error.response?.data?.[0]?.message)
		}
	}
}
