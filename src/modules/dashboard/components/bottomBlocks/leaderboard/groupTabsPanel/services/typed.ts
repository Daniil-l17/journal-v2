export type LeaderGroupItem = {
	id: number | null
	full_name: string | null
	photo_path: string | null
	position: number
	amount: number | null
}

export type LeaderGroupResponse = LeaderGroupItem[]
