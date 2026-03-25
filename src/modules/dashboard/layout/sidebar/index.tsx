'use client'

import { Tooltip } from '@mantine/core'
import { Button } from '@mantine/core'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, usePathname } from 'next/navigation'
import LogoSvg from '@/src/assets/icons/logo.svg'
import { NAV_ITEMS } from './constants'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useProfile } from '@/src/modules/dashboard/hooks/useProfile'
import { LogOut } from 'lucide-react'

export function Sidebar() {
	const params = useParams()
	const pathname = usePathname()
	const router = useRouter()
	const { refetch, isFetching } = useProfile()

	const handleDashboard = () => {
		router.push(`/${params.locale}/dashboard`)
	}

	const handleLogout = () => {
		Cookies.remove('access_token')
		Cookies.remove('refresh_token')
		refetch()
	}

	return (
		<aside
			className={`flex h-full relative shrink-0 flex-col border-r border-gray-200 pt-16 py-4 transition-[width] duration-200 max-md:hidden w-20`}
		>
			<Button
				onClick={handleDashboard}
				className='w-11! absolute! top-3! left-4.5! h-11! p-0! bg-transparent! items-center text-gray-700! hover:bg-gray-100! hover:text-gray-900!'
			>
				<Image src={LogoSvg} priority width={34} height={34} alt='logo' className='shrink-0' />
			</Button>

			<nav className={`flex min-h-0 flex-1 flex-col gap-2 items-center overflow-y-auto border-t border-gray-200 pt-4`}>
				{NAV_ITEMS.map(element => {
					const fullPath = `/${params.locale}${element.href}`
					const isActive = pathname === fullPath

					return (
						<Tooltip key={element.title} label={element.title} position='right' withArrow>
							<Link
								href={fullPath}
								className={`flex h-11 shrink-0 items-center rounded-lg transition-colors hover:bg-gray-100 ${'w-11 justify-center'} ${isActive ? 'text-gray-900 bg-gray-100 font-semibold' : 'text-gray-400 hover:text-gray-900'}`}
								aria-label={element.title}
							>
								<element.icon size={22} className='shrink-0' />
							</Link>
						</Tooltip>
					)
				})}
			</nav>
			<Button
				type='button'
				loading={isFetching}
				variant='filled'
				color='red'
				size='md'
				onClick={handleLogout}
				aria-label='Выйти'
				w={40}
				h={40}
				className='shrink-0 self-center p-0!'
			>
				<LogOut size={22} strokeWidth={2} />
			</Button>
		</aside>
	)
}
