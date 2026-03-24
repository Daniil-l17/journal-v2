export type Props = {
	photoPreview: { src: string; alt: string } | null
	setPhotoPreview: (photoPreview: { src: string; alt: string } | null) => void
}
