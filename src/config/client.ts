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
		}
		return Promise.reject(error)
	}
)
