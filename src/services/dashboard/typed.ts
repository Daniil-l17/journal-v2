export type ScheduleOperationItem = {
	date: string
	lesson: number
	started_at: string
	finished_at: string
	teacher_name: string
	subject_name: string
	room_name: string
}

export type ScheduleOperationsResponse = ScheduleOperationItem[]
