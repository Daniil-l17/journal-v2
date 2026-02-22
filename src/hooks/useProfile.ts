import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { authService } from '../services/auth'
import type { UserInfo } from '../services/auth/typed'

const defaultProfile = {} as UserInfo

export const useProfile = () => {
	const result = useQuery({
		queryKey: ['profile'],
		queryFn: async () => {
			const response = await authService.getProfile()
			return response
		}
	})
	return { ...result, data: result.data ?? defaultProfile }
}
