'use client'

import { Tooltip } from '@mantine/core'
import Link from 'next/link'
import { useParams } from 'next/navigation'
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

const NAV_ITEMS: { icon: React.ComponentType<{ size?: number; className?: string }>; label: string; href: string }[] = [
	{ icon: Home, label: 'Главная', href: '/dashboard' },
	{ icon: Calendar, label: 'Расписание', href: '/schedule' },
	{ icon: GraduationCap, label: 'Оценки', href: '/grades' },
	{ icon: BookOpen, label: 'ДЗ', href: '/homework' },
	{ icon: Megaphone, label: 'Объявления', href: '/announcements' },
	{ icon: Trophy, label: 'Награды', href: '/rewards' },
	{ icon: MessageSquare, label: 'Отзывы о студенте', href: '/reviews' },
	{ icon: UserCircle, label: 'Личный кабинет', href: '/profile' },
	{ icon: Contact, label: 'Контакты', href: '/contacts' },
	{ icon: Send, label: 'Обращения', href: '/appeals' },
	{ icon: Flag, label: 'Жалобы', href: '/complaints' },
	{ icon: ShoppingCart, label: 'Маркет', href: '/market' }
]

export function Sidebar() {
	const params = useParams()

	return (
		<aside className='flex h-full w-20 flex-col items-center bg-gray-100 border-r border-gray-200 py-4'>
			<nav className='flex flex-col items-center gap-1'>
				{NAV_ITEMS.map(({ icon: Icon, label, href }) => (
					<Tooltip key={label} label={label} position='right' withArrow>
						<Link
							href={`/${params.locale}${href}`}
							className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900'
							aria-label={label}
						>
							<Icon size={22} className='shrink-0' />
						</Link>
					</Tooltip>
				))}
			</nav>
		</aside>
	)
}
