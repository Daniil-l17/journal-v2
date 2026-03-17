import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/notifications/styles.css'
import './globals.css'
import { Providers } from '@/src/providers'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
	title: 'Journal-v2',
	description: ''
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
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' suppressHydrationWarning>
			<body className={`${inter.variable} antialiased`} suppressHydrationWarning>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
