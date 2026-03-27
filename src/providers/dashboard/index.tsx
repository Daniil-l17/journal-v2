'use client'
import { PageTitle } from '@/src/modules/dashboard/layout/pageTitle'
import { usePathname } from 'next/navigation'
import { FC, ReactNode, useEffect, useRef } from 'react'

export const DashboardProviders: FC<{ children: ReactNode }> = ({ children }) => {
	const pathname = usePathname()
	const refScroll = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (refScroll.current) {
			refScroll.current.scrollTo({
				top: 0,
				behavior: 'auto'
			})
		}
	}, [pathname])

	return (
		<main
			ref={refScroll}
			className='flex flex-1 flex-col overflow-x-hidden overflow-y-auto scrollbar-thumb-indigo-500 scrollbar-track-transparent bg-linear-to-b from-indigo-300 to-indigo-100 p-6'
		>
			<div className='mb-4 max-w-[1800px] mx-auto w-full'>
				<PageTitle />
				{children}
			</div>
		</main>
	)
}
