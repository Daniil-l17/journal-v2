'use client'

import { useProfile } from '@/src/modules/dashboard/hooks/useProfile'
import { Button, Drawer } from '@mantine/core'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

import { FC } from 'react'
import { NAV_ITEMS } from '../../sidebar/constants'
import { IconWallet } from '@/src/modules/dashboard/components/iconWallet'

export const BurgerDrawer: FC<Props> = ({ opened, onClose }) => {
	const { data, isLoading } = useProfile()
	const params = useParams()
	const pathname = usePathname()

	const handleLogout = () => {
		onClose()
	}

	const handleNavClick = () => {
		onClose()
	}

	return (
		<Drawer
			opened={opened}
			onClose={onClose}
			position='right'
			title='Меню'
			classNames={{ header: 'border-b border-gray-200', title: 'text-lg font-semibold' }}
		>
			<div className='flex h-full flex-col pt-4'>
				<div className='flex flex-1 flex-col gap-6'>
					{!isLoading && data && (
						<div className='flex flex-col items-stretch gap-2 rounded-2xl bg-gray-100 p-4'>
							<div className='flex items-center gap-2'>
								<IconWallet type='TOPMONEY' size={14} />
								<span className='text-sm font-semibold text-gray-900'>{data.gaming_points[0].points + data.gaming_points[1].points}</span>
							</div>
							<div className='flex items-center gap-2'>
								<IconWallet type='TOPCOINS' size={18} />
								<span className='text-sm font-semibold text-gray-900'>{data.gaming_points[0].points}</span>
							</div>
							<div className='flex items-center gap-2'>
								<IconWallet type='TOPGEMS' size={18} />
								<span className='text-sm font-semibold text-gray-900'>{data.gaming_points[1].points}</span>
							</div>
						</div>
					)}

					<nav className='flex flex-col gap-1 border-t border-gray-200 pt-4'>
						{NAV_ITEMS.map(element => {
							const fullPath = `/${params.locale}${element.href}`
							const isActive = pathname === fullPath
							return (
								<Link
									key={element.title}
									href={fullPath}
									onClick={handleNavClick}
									className={`flex h-11 items-center gap-3 rounded-lg px-3 transition-colors hover:bg-gray-100 ${
										isActive ? 'bg-gray-100 font-semibold text-gray-900' : 'text-gray-600'
									}`}
									aria-label={element.title}
								>
									<element.icon size={22} className='shrink-0' />
									<span className='text-sm font-medium'>{element.title}</span>
								</Link>
							)
						})}
					</nav>
				</div>

				<Button
					variant='light'
					color='red'
					size='md'
					leftSection={<LogOut size={18} />}
					onClick={handleLogout}
					aria-label='Выйти'
					className='mt-4 w-full'
				>
					Выйти
				</Button>
			</div>
		</Drawer>
	)
}
