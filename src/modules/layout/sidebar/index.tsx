'use client'

import { Tooltip } from '@mantine/core'
import { Button } from '@mantine/core'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, usePathname } from 'next/navigation'
import LogoSvg from '@/src/assets/icons/logo.svg'
import { NAV_ITEMS } from './constants'

export function Sidebar() {
	const params = useParams()
	const pathname = usePathname()

	return (
		<aside
			className={`flex h-full relative shrink-0 flex-col border-r border-gray-200 pt-16 py-4 transition-[width] duration-200 max-md:hidden w-20`}
		>
			<Button className='w-11! absolute! top-3! left-4.5! h-11! p-0! bg-transparent! items-center text-gray-700! hover:bg-gray-100! hover:text-gray-900!'>
				<Image src={LogoSvg} priority width={34} height={34} alt='logo' className='shrink-0' />
			</Button>

			<nav className={`flex border-t pt-4 border-gray-200 flex-col gap-1 items-center`}>
				{NAV_ITEMS.map(element => {
					const fullPath = `/${params.locale}${element.href}`
					const isActive = pathname === fullPath
					const link = (
						<Link
							href={fullPath}
							className={`flex h-11 shrink-0 items-center rounded-lg transition-colors hover:bg-gray-100 ${'w-11 justify-center'} ${isActive ? 'text-gray-900 font-semibold' : 'text-gray-400 hover:text-gray-900'}`}
							aria-label={element.title}
						>
							<element.icon size={22} className='shrink-0' />
						</Link>
					)

					return (
						<Tooltip key={element.title} label={element.title} position='right' withArrow>
							{link}
						</Tooltip>
					)
				})}
			</nav>
		</aside>
	)
}
