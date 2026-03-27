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
