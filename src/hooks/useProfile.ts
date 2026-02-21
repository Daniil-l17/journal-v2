import { instance } from '@/src/config'
import { useQuery } from '@tanstack/react-query'

export const useProfile = () => {
	return useQuery({
		queryKey: ['profile'],
		queryFn: async () => {
			const response = await instance.get('/api/profile')
			return response.data
		}
	})
}
