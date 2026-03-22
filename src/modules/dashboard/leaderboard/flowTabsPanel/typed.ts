import { LeaderboardTab } from '../typed'

export type Props = {
	activeTab: LeaderboardTab
	setPhotoPreview: (photoPreview: { src: string; alt: string } | null) => void
}
