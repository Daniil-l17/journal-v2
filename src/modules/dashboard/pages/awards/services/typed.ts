export type AchievePointItem = {
	id: number
	points_count: number
}

export type StudentAchievement = {
	id: number
	translate_key: string
	is_active: boolean
	achieve_points: AchievePointItem[]
}
