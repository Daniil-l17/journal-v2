import { instance } from '@/src/config/client'
import type { ContactsOperationsResponse } from './typed'

export const contactsService = {
	getOperationsIndex: async () => {
		const { data } = await instance.get<ContactsOperationsResponse>('/api/contacts/operations/index')
		return data
	}
}

