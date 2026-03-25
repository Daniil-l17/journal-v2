'use client'

import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '../sidebar/constants'

export const PageTitle = () => {
	const pathname = usePathname()

	if (!pathname) return null

	const path = pathname.replace(/\/$/, '').replace(/^\/[^/]+/, '') || '/'
	const title = NAV_ITEMS.find(nav => nav.href === path)?.title ?? null

	if (!title) return null

	return (
		<h2 className='mb-6 shrink-0 text-3xl font-semibold tracking-tight text-gray-900 max-lg:mb-5 max-lg:text-2xl max-md:mb-4 max-md:text-xl max-sm:mb-4 max-sm:text-lg'>
			{title}
		</h2>
	)
}
