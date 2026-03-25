'use client'

import { useQuery } from '@tanstack/react-query'
import { AsyncContent } from '@/src/modules/dashboard/components/asyncContent'
import { contactsService } from './services'
import { AddressBlock } from './address'
import { AdmissionCommitteeBlock } from './admissionCommittee'
import { AcademicOfficeBlock } from './academicOffice'
import { CuratorBlock } from './curator'

export const Contacts = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['contacts-operations-index'],
		queryFn: () => contactsService.getOperationsIndex()
	})

	const contacts = data ?? null
	const isEmpty = !contacts || !contacts.adress?.length

	return (
		<AsyncContent isLoading={isLoading} isError={isError} isEmpty={isEmpty}>
			<div className='grid grid-cols-3 items-stretch gap-4 max-lg:grid-cols-2 max-md:grid-cols-1'>
				<AddressBlock contacts={contacts!} />
				<AdmissionCommitteeBlock contacts={contacts!} />
				<AcademicOfficeBlock contacts={contacts!} />
			</div>
			<CuratorBlock contacts={contacts!} />
		</AsyncContent>
	)
}
