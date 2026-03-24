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
	title: 'Journal-v2',
	description: 'Электронный журнал нового поколения для студентов IT TOP',
	keywords: [
		'IT TOP',
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
