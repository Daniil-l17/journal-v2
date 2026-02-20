'use client'

import { ReactNode, useLayoutEffect } from 'react'
import { MantineProvider, createTheme } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

const theme = createTheme({
  defaultRadius: 'md'
})

export function Providers({ children }: { children: ReactNode }) {
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
      <MantineProvider theme={theme} defaultColorScheme='light'>
        <Toaster position='top-center' richColors />
        {children}
      </MantineProvider>
    </QueryClientProvider>
  )
}
