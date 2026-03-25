'use client'

import type { FC } from 'react'
import { Mail } from 'lucide-react'
import type { Props } from './typed'

export const Emails: FC<Props> = ({ emails }) => {
	if (!emails?.length) return null

	return (
		<div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
			{emails.map((mail, i) => (
				<a
					key={`${mail}-${i}`}
					href={`mailto:${mail}`}
					className='inline-flex max-w-full items-center gap-2 break-all text-base font-medium text-blue-600 hover:underline'
				>
					<Mail size={16} className='text-blue-600' />
					<span>{mail}</span>
				</a>
			))}
		</div>
	)
}

