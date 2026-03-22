const MAP: Record<string, string> = {
	'5_VISITS_WITHOUT_GAP': '/awards/completed-profile.png',
	'10_VISITS_WITHOUT_GAP': '/awards/completed-profile.png',
	'20_VISITS_WITHOUT_GAP': '/awards/completed-profile.png',
	'5_VISITS_WITHOUT_DELAY': '/awards/without-being-late-5.png',
	'10_VISITS_WITHOUT_DELAY': '/awards/without-being-late-10.png',
	'20_VISITS_WITHOUT_DELAY': '/awards/without-being-late-20.png',
	SOCIAL_ACTIVITY: '/awards/superbaidge.png',
	FILL_IN_PROFILE: '/awards/completed-profile.png',
	FRIEND_OF_ACADEMY: '/awards/recruiting-friend.png',
	STEP_TSHIRT: '/awards/visiting-the-academy-in-a-t-shirt-with-the-top-logo.png',
	SURVEY: '/awards/participation-in-the-survey.png',
	COMPETITION: '/awards/participation-in-the-competition.png',
	EMAIL_CONFIRMATION: '/awards/email-confirm.png',
	SOCIAL_REVIEW: '/awards/superbaidge.png'
}

const FALLBACK = '/awards/superbaidge.png'

export function getAwardImageSrc(translateKey: string): string {
	return MAP[translateKey] ?? FALLBACK
}
