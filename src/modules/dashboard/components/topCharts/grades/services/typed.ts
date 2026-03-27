export type GradeVisitItem = {
	date: string
	points: number
	previous_points: number | null
	has_rasp: number | null
}

export type GradeVisitsResponse = GradeVisitItem[]
