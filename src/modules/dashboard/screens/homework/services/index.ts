import { instance } from '@/src/config/client'
import type { HomeworkItem } from './typed'

export type HomeworkListParams = {
	page: number
	status: 0 | 1 | 2 | 3
	type: 0 | 5
	group_id: number
}

export const homeworkService = {
	getList: async (params: HomeworkListParams) => {
		const { data } = await instance.get<HomeworkItem[]>('/api/homework/operations/list', { params })
		return data
	}
}

