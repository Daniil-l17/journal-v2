export type ActivityItem = {
	date: string
	action: number
	current_point: number
	point_types_id: number
	point_types_name: string
	achievements_id: number
	achievements_name: string
	achievements_type: number
	badge: number
	old_competition: boolean
}

export type ActivityResponse = ActivityItem[]
