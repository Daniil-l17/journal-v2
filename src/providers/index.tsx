'use client'

import { ReactNode, useLayoutEffect } from 'react'
import { MantineProvider, createTheme } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { useParams } from 'next/navigation'
import { IntlProvider } from 'react-intl'
import ru from '@/src/assets/lang/ru.json'

const theme = createTheme({
	defaultRadius: 'md'
})

const MESSAGES: Record<string, Record<string, string>> = { ru }

export function Providers({ children }: { children: ReactNode }) {
	const params = useParams<{ locale: string }>()
	const locale = params.locale && ['ru'].includes(params.locale) ? params.locale : 'ru'
	const messages = MESSAGES[locale] ?? ru

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				refetchOnMount: false,
				retry: 1
			}
		}
	})

	useLayoutEffect(() => {
		document.documentElement.setAttribute('data-theme', 'light')
		document.documentElement.setAttribute('data-mantine-color-scheme', 'light')
	}, [])

	return (
		<QueryClientProvider client={queryClient}>
			<IntlProvider locale={locale} defaultLocale='ru' messages={messages}>
				<MantineProvider theme={theme} defaultColorScheme='light'>
					<Toaster position='top-center' richColors />
					{children}
				</MantineProvider>
			</IntlProvider>
		</QueryClientProvider>
	)
}
