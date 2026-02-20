import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@mantine/core/styles.css'
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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru' suppressHydrationWarning>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densityDpi=device-dpi'
        />
      </head>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.setAttribute('data-theme', 'light');
                  document.documentElement.setAttribute('data-mantine-color-scheme', 'light');
                } catch (e) {}
              })();
            `
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
