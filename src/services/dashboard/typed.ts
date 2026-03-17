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

export type GradeVisitItem = {
	date_visit: string
	lesson_number: number
	spec_id: number
	spec_name: string
	teacher_name: string
	lesson_theme: string
	status_was: number | null
	home_work_mark: number | null
	lab_work_mark: number | null
	class_work_mark: number | null
	control_work_mark: number | null
	practical_work_mark: number | null
	final_work_mark: number | null
}

export type GradeVisitsResponse = GradeVisitItem[]

export type HistorySpecItem = {
	id: number
	name: string
	short_name: string
}

export type HistorySpecsResponse = HistorySpecItem[]
