import { instance } from '@/src/config'
import { LoginDto } from '@/src/services/auth/typed'
import Cookies from 'js-cookie'
import { isAxiosError } from 'axios'

function extractApiMessage(data: unknown): string | undefined {
  if (!Array.isArray(data) || data.length === 0) return
  const first = data[0]
  if (!first || typeof first !== 'object') return
  const message = (first as Record<string, unknown>).message
  return typeof message === 'string' && message.length > 0 ? message : undefined
}

export const authService = {
	login: async (dto: LoginDto) => {
		try {
			const response = await instance.post('/api/auth/login', { ...dto, application_key: process.env.NEXT_PUBLIC_APPLICATION_KEY })

			Cookies.set('access_token', response.data.access_token)
			Cookies.set('refresh_token', response.data.refresh_token)
		} catch (error: unknown) {
      if (isAxiosError(error)) {
        const maybeMessage = extractApiMessage(error.response?.data)
        throw new Error(maybeMessage ?? 'Ошибка авторизации')
      }
      throw new Error(error instanceof Error ? error.message : 'Ошибка авторизации')
		}
	}
}
