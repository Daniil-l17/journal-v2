import axios from 'axios'
import { cookies } from 'next/headers'

const serverDefaultHeaders: Record<string, string> = {
	Accept: 'application/json, text/plain, */*',
	Referer: 'https://journal.top-academy.ru/',
	Origin: 'https://journal.top-academy.ru'
}

export const serverInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: serverDefaultHeaders,
	validateStatus: () => true
})

serverInstance.interceptors.request.use(async config => {
	const cookieStore = await cookies()
	const token = cookieStore.get('access_token')?.value
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})
