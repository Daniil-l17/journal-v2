import axios from 'axios'

const serverDefaultHeaders: Record<string, string> = {
	Accept: 'application/json, text/plain, */*',
	Referer: 'https://journal.top-academy.ru/',
	Origin: 'https://journal.top-academy.ru'
}

export const instance = axios.create({
	baseURL: ''
})

export const serverInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: serverDefaultHeaders,
	validateStatus: () => true
})

/*instance.interceptors.request.use(config => {
  if (typeof window === 'undefined') return config
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})*/

/*instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken')
      }
    }
    return Promise.reject(error)
  }
)
*/
