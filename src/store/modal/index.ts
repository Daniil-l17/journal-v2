import { create } from 'zustand'
import type { ModalStore } from './typed'

export const useModalStore = create<ModalStore>((set, get) => ({
	modals: {
		auth: false
	},
	openModal: name =>
		set(state => ({
			modals: {
				...state.modals,
				[name]: true
			}
		})),
	closeModal: name =>
		set(state => ({
			modals: {
				...state.modals,
				[name]: false
			}
		})),
	isOpen: name => get().modals[name]
}))
