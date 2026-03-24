import { instance } from '@/src/config/client'
import type { StudentReviewItem } from './typed'

export const reviewsService = {
	getList: async () => {
		const { data } = await instance.get<StudentReviewItem[]>('/api/dashboard/reviews/index/list')
		return data
	}
}
