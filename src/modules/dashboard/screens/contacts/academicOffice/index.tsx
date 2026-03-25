'use client'

import type { FC } from 'react'
import type { Props } from './typed'
import { Emails } from '../components/email'
import { Phones } from '../components/phone'

export const AcademicOfficeBlock: FC<Props> = ({ contacts }) => {
	return (
		<section className='flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
			<div className='shrink-0 border-b border-gray-100 px-4 pt-4 pb-3'>
				<div className='flex items-center justify-between gap-3'>
					<h3 className='text-lg font-bold leading-snug text-gray-900'>Учебная часть</h3>
					<span className='text-base font-semibold text-gray-900'>
						{contacts.schedule_academic?.length ? contacts.schedule_academic.join(' ') : ''}
					</span>
				</div>
			</div>

			<div className='space-y-4 px-4 py-3'>
				<ul className='list-disc space-y-1 pl-5 text-base text-gray-800'>
					<li>Общие вопросы</li>
					<li>Вопросы по учебному процессу</li>
					<li>Вопросы по оплате и содержанию курсов</li>
				</ul>

				{contacts.learning_tel?.length ? <Phones phones={contacts.learning_tel} /> : null}
				{contacts.mail_shag?.length ? <Emails emails={contacts.mail_shag} /> : null}
			</div>
		</section>
	)
}
