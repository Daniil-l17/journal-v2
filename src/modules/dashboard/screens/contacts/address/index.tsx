'use client'

import type { FC } from 'react'
import type { Props } from './typed'
import { Link2, MapPin } from 'lucide-react'

const YANDEX_MAPS_URL =
	'https://yandex.com/maps/973/surgut/house/ulitsa_30_let_pobedy_44_a/Y0oYcgRhTEYDQFhrfX50cnlrZA==/?ll=73.431534%2C61.253581&z=17'

export const AddressBlock: FC<Props> = ({ contacts }) => {
	return (
		<section className='flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
			<div className='shrink-0 border-b border-gray-100 px-4 pt-4 pb-3'>
				<h3 className='text-lg font-bold leading-snug text-gray-900'>Адрес</h3>
			</div>

			<div className='flex flex-col gap-4 px-4 py-3'>
				{contacts.adress?.map((a, idx) => (
					<div key={`${a.adress_name}-${idx}`} className='space-y-2'>
						<p className='text-base font-semibold text-gray-900'>{a.adress_name}</p>
						{contacts.site_shag?.length ? (
							<div className='flex flex-col gap-2 pt-1'>
								{contacts.site_shag.map((url, i) => (
									<a
										key={`${url}-${i}`}
										href={url}
										target='_blank'
										rel='noopener noreferrer'
										className='inline-flex max-w-full items-center gap-2 break-all text-base font-medium text-blue-600 hover:underline'
									>
										<Link2 size={16} className='text-blue-600' />
										<span>{url}</span>
									</a>
								))}
							</div>
						) : null}
					</div>
				))}
			</div>

			<div className='px-4 pb-4'>
				<a
					href={YANDEX_MAPS_URL}
					target='_blank'
					rel='noopener noreferrer'
					className='inline-flex items-center gap-2 text-base font-semibold text-blue-600 hover:underline'
				>
					<MapPin size={16} className='text-blue-600' />
					<span>Перейти на карту</span>
				</a>
			</div>
		</section>
	)
}

