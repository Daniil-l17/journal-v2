import { ReactNode } from 'react'

export type Props = {
	isLoading: boolean
	isError: boolean
	minHeight?: string
	children: ReactNode
	customErrorText?: string
	customEmptyText?: string
	isEmpty: boolean
}
