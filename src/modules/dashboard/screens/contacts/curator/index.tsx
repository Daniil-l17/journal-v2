'use client'

import type { FC } from 'react'
import type { Props } from './typed'
import { Emails } from '../components/email'

export const CuratorBlock: FC<Props> = ({ contacts }) => {
	if (!contacts.teach_main?.length) return null

	return (
		<section className='mt-4 flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
			<div className='shrink-0 border-b border-gray-100 px-4 pt-4 pb-3'>
				<h3 className='text-lg font-bold leading-snug text-gray-900'>Куратор</h3>
			</div>

			<ul className='grid grid-cols-2 gap-4 px-4 py-3 max-lg:grid-cols-1'>
				{contacts.teach_main.map((t, idx) => (
					<li key={`${t.teachMain_name}-${idx}`} className='space-y-2'>
						<p className='text-base font-semibold text-gray-900'>{t.teachMain_name}</p>
						{t.href_teach?.length ? <Emails emails={t.href_teach} /> : <p className='text-base text-gray-500'>—</p>}
					</li>
				))}
			</ul>
		</section>
	)
}
