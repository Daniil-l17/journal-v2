import { BookOpen, Contact, Calendar, GraduationCap, Home, PenTool, Trophy } from 'lucide-react'
import { ComponentType } from 'react'

export const NAV_ITEMS: { icon: ComponentType<{ size?: number; className?: string }>; title: string; href: string }[] = [
	{ icon: Home, title: 'Главная', href: '/dashboard' },
	{ icon: Calendar, title: 'Расписание', href: '/dashboard/schedule' },
	{ icon: GraduationCap, title: 'Оценки', href: '/dashboard/grades' },
	{ icon: BookOpen, title: 'ДЗ', href: '/dashboard/homework' },
	{ icon: PenTool, title: 'Отзывы о студенте', href: '/dashboard/student-reviews' },
	{ icon: Trophy, title: 'Награды', href: '/dashboard/awards' },
	{ icon: Contact, title: 'Контакты', href: '/dashboard/contacts' }
]
