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

export type UserInfoGroup = {
	group_status: number
	is_primary: boolean
	id: number
	name: string
}

export type UserInfoGamingPoint = {
	new_gaming_point_types__id: number
	points: number
}

export type UserInfoVisibility = {
	is_design: boolean
	is_video_courses: boolean
	is_vacancy: boolean
	is_signal: boolean
	is_promo: boolean
	is_test: boolean
	is_email_verified: boolean
	is_quizzes_expired: boolean
	is_debtor: boolean
	is_phone_verified: boolean
	is_only_profile: boolean
	is_referral_program: boolean
	is_dz_group_issue: boolean
	is_birthday: boolean
	is_school: boolean
	is_news_popup: boolean
	is_school_branch: boolean
	is_college_branch: boolean
	is_higher_education_branch: boolean
	is_russian_branch: boolean
	is_academy_branch: boolean
}

export type UserInfo = {
	groups: UserInfoGroup[]
	manual_link: string | null
	student_id: number
	current_group_id: number
	full_name: string
	achieves_count: number
	stream_id: number
	stream_name: string
	group_name: string
	level: number
	photo: string
	gaming_points: UserInfoGamingPoint[]
	spent_gaming_points: unknown[]
	visibility: UserInfoVisibility
	current_group_status: number
	birthday: string
	age: number
	last_date_visit: string
	registration_date: string
	gender: number
	study_form_short_name: string
}
