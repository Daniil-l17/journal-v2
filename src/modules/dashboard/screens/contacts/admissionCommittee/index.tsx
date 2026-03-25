'use client'

import type { FC } from 'react'
import type { Props } from './typed'
import { Emails } from '../components/email'
import { Phones } from '../components/phone'

export const AdmissionCommitteeBlock: FC<Props> = ({ contacts }) => {
	return (
		<section className='flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
			<div className='shrink-0 border-b border-gray-100 px-4 pt-4 pb-3'>
				<h3 className='text-lg font-bold leading-snug text-gray-900'>Приемная комиссия</h3>
			</div>

			<div className='space-y-4 px-4 py-3'>
				<ul className='list-disc space-y-1 pl-5 text-base text-gray-800'>
					<li>Вопросы по покупке новых курсов</li>
					<li>Записать на обучение друзей и знакомых</li>
					<li>Стать студентом колледжа</li>
				</ul>

				{contacts.tel_room?.length ? <Phones phones={contacts.tel_room} /> : null}
				{contacts.mail_shag?.length ? <Emails emails={contacts.mail_shag} /> : null}
			</div>
		</section>
	)
}
