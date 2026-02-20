export type ModalName = 'auth'

export interface ModalStore {
	modals: Record<ModalName, boolean>
	openModal: (name: ModalName) => void
	closeModal: (name: ModalName) => void
	isOpen: (name: ModalName) => boolean
}
