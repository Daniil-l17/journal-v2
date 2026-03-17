import { BookOpen, Contact, Calendar, GraduationCap, Home } from 'lucide-react'
export const NAV_ITEMS: { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; href: string }[] = [
	{ icon: Home, title: 'Главная', href: '/dashboard' },
	{ icon: Calendar, title: 'Расписание', href: '/dashboard/schedule' },
	{ icon: GraduationCap, title: 'Оценки', href: '/dashboard/grades' },
	{ icon: BookOpen, title: 'ДЗ', href: '/dashboard/homework' },
	{ icon: Contact, title: 'Контакты', href: '/dashboard/contacts' }
]
