'use client'

import { useState } from 'react'
import { Tooltip } from '@mantine/core'
import { Button } from '@mantine/core'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import {
	Home,
	Calendar,
	GraduationCap,
	BookOpen,
	Megaphone,
	Trophy,
	MessageSquare,
	UserCircle,
	Contact,
	Send,
	Flag,
	ShoppingCart
} from 'lucide-react'

const LogoIcon = () => (
	<svg width={32} height={25} viewBox='0 0 50 39' fill='none' xmlns='http://www.w3.org/2000/svg' className='shrink-0' aria-hidden>
		<path d='M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z' fill='#d91842' />
		<path d='M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z' fill='#d91842' />
	</svg>
)

const NAV_ITEMS: { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; href: string }[] = [
	{ icon: Home, title: 'Главная', href: '/dashboard' },
	{ icon: Calendar, title: 'Расписание', href: '/schedule' },
	{ icon: GraduationCap, title: 'Оценки', href: '/grades' },
	{ icon: BookOpen, title: 'ДЗ', href: '/homework' },
	{ icon: MessageSquare, title: 'Отзывы о студенте', href: '/reviews' },
	{ icon: Contact, title: 'Контакты', href: '/contacts' }
	/*	{ icon: Megaphone, title: 'Объявления', href: '/announcements' },*/
	/*	{ icon: Trophy, title: 'Награды', href: '/rewards' },*/
	/*	{ icon: UserCircle, title: 'Личный кабинет', href: '/profile' },*/
	/*	{ icon: Send, title: 'Обращения', href: '/appeals' },
	{ icon: Flag, title: 'Жалобы', href: '/complaints' },*/
	/*	{ icon: ShoppingCart, title: 'Маркет', href: '/market' }*/
]

export function Sidebar() {
	const params = useParams()
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<aside
			className={`flex h-full relative shrink-0 flex-col border-r border-gray-200 pt-16 py-4 transition-[width] duration-200 ${isOpen ? 'w-60' : 'w-20'}`}
		>
			<Button
				className='w-11! absolute! top-3! left-5! h-11! p-0! bg-transparent! items-center text-gray-700! hover:bg-gray-200! hover:text-gray-900!'
				onClick={() => setIsOpen(prev => !prev)}
			>
				<LogoIcon />
			</Button>
			<nav className={`flex border-t pt-2 border-gray-200 flex-col gap-1 ${isOpen ? 'items-stretch px-2' : 'items-center'}`}>
				{NAV_ITEMS.map(element => {
					const fullPath = `/${params.locale}${element.href}`
					const isActive = pathname === fullPath
					const link = (
						<Link
							href={fullPath}
							className={`flex h-11 shrink-0 items-center rounded-lg transition-colors hover:bg-gray-100 ${
								isOpen ? 'w-full px-3 gap-3' : 'w-11 justify-center'
							} ${isActive ? 'text-gray-900 font-semibold' : 'text-gray-400 hover:text-gray-900'}`}
							aria-label={element.title}
						>
							<element.icon size={22} className='shrink-0' />
							{isOpen && <span className='text-sm truncate font-medium'>{element.title}</span>}
						</Link>
					)

					return isOpen ? (
						<div key={element.title}>{link}</div>
					) : (
						<Tooltip key={element.title} label={element.title} position='right' withArrow>
							{link}
						</Tooltip>
					)
				})}
			</nav>
		</aside>
	)
}
