import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../../dashboard/services'
import type { UserInfo } from '../../dashboard/services/typed'

const defaultProfile = {} as UserInfo

export const useProfile = () => {
	const result = useQuery({
		queryKey: ['profile'],
		queryFn: async () => {
			const response = await dashboardService.getProfile()
			return response
		}
	})
	return { ...result, data: result.data ?? defaultProfile }
}
