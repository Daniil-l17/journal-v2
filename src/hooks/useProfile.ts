import { useQuery } from '@tanstack/react-query'
import { authService } from '../services/auth'

export const useProfile = () => {
	return useQuery({
		queryKey: ['profile'],
		queryFn: async () => {
			const response = await authService.getProfile()
			return response
		}
	})
}
