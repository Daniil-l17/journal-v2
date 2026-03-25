import { instance } from '@/src/config/client'
import type { EvaluateLessonItem } from './typed'

export const feedbackService = {
	getEvaluateLessonList: async () => {
		const { data } = await instance.get<EvaluateLessonItem[]>('/api/feedback/students/evaluate-lesson-list')
		return data
	}
}
