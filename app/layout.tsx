import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/notifications/styles.css'
import './globals.css'
import { MainProviders } from '@/src/providers/main'
import { ReactNode } from 'react'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
	title: 'Journal-v2 - Электронный журнал IT TOP Academy',
	description: 'Электронный журнал IT TOP Academy для студентов',
	openGraph: {
		title: 'Journal-v2 - Электронный журнал IT TOP Academy',
		description: 'Электронный журнал IT TOP Academy для студентов',
		images: ['/favicon.ico']
	},
	twitter: {
		title: 'Journal-v2 - Электронный журнал IT TOP Academy',
		description: 'Электронный журнал IT TOP Academy для студентов',
		images: ['/favicon.ico']
	},
	metadataBase: new URL('https://journal.top-academy.ru'),
	alternates: {
		canonical: 'https://journal.top-academy.ru'
	},
	category: 'education',
	creator: 'IT TOP Academy',
	publisher: 'IT TOP Academy',
	robots: {
		index: true,
		follow: true
	},
	authors: [{ name: 'IT TOP Academy', url: 'https://top-academy.ru' }],
	applicationName: 'Journal-v2',
	formatDetection: {
		email: false,
		address: false,
		telephone: false
	},
	verification: {
		google: 'google-site-verification=1234567890'
	},
	other: {
		'apple-mobile-web-app-title': 'Journal-v2',
		'apple-mobile-web-app-capable': 'yes',
		'apple-mobile-web-app-status-bar-style': 'black'
	},
	icons: {
		icon: '/favicon.ico'
	},
	keywords: [
		'IT TOP',
		'IT TOP Academy',
		'IT TOP Academy Journal',
		'IT TOP Academy Journal-v2',
		'IT TOP Academy Journal-v2',
		'Journal-v2',
		'journal',
		'journal-v2',
		'электронный журнал',
		'студенты',
		'учеба',
		'оценки',
		'домашние задания',
		'расписание',
		'занятия',
		'Journal-v2',
		'IT TOP Academy'
	]
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	minimumScale: 1,
	userScalable: false
}

export default function RootLayout({
	children
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang='ru' suppressHydrationWarning>
			<body className={`${inter.variable} antialiased`} suppressHydrationWarning>
				<MainProviders>{children}</MainProviders>
			</body>
		</html>
	)
}
