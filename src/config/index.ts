import axios from 'axios'
import Cookies from 'js-cookie'

export const instance = axios.create({
	baseURL: ''
})

instance.interceptors.response.use(
	response => response,
	error => {
		if (error.response?.status === 401 && typeof window !== 'undefined') {
			Cookies.remove('access_token')
			Cookies.remove('refresh_token')
			const locale = window.location.pathname.split('/')[1]
			window.location.href = `/${locale}/login`
		}
		return Promise.reject(error)
	}
)
