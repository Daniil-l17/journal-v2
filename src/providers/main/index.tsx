'use client'

import 'dayjs/locale/ru'
import { ReactNode, useState } from 'react'
import { MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Notifications } from '@mantine/notifications'
import { useParams } from 'next/navigation'
import { IntlProvider } from 'react-intl'
import { ThemeProvider } from 'next-themes'
import ru from '@/src/assets/lang/ru.json'
import { themeConfig } from '@/src/config/theme'

const MESSAGES: Record<string, Record<string, string>> = { ru }

export function MainProviders({ children }: { children: ReactNode }) {
	const params = useParams<{ locale: string }>()
	const locale = params.locale && ['ru'].includes(params.locale) ? params.locale : 'ru'
	const messages = MESSAGES[locale] ?? ru

	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						refetchOnMount: false,
						retry: 1
					}
				}
			})
	)

	return (
		<ThemeProvider
			attribute={['data-theme', 'data-mantine-color-scheme']}
			storageKey='mantine-color-scheme'
			defaultTheme='light'
			enableSystem={false}
			disableTransitionOnChange
		>
			<QueryClientProvider client={queryClient}>
				<IntlProvider locale={locale} defaultLocale='ru' messages={messages}>
					<MantineProvider theme={themeConfig} defaultColorScheme='light'>
						<DatesProvider settings={{ locale: 'ru', firstDayOfWeek: 1 }}>
							<Notifications position='top-right' />
							{children}
						</DatesProvider>
					</MantineProvider>
				</IntlProvider>
			</QueryClientProvider>
		</ThemeProvider>
	)
}
