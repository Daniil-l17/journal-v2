import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	compiler: {
		removeConsole: process.env.NODE_ENV !== 'development'
	},
	images: {
		formats: ['image/avif', 'image/webp'],
		domains: ['fs.top-academy.ru']
	},
	compress: true,
	poweredByHeader: false,
	experimental: {
		optimizePackageImports: ['@mantine/core', '@mantine/hooks', 'lucide-react']
	},
	productionBrowserSourceMaps: false,
	async headers() {
		if (process.env.NODE_ENV === 'development') return []
		return [
			{
				source: '/_next/static/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable'
					}
				]
			}
		]
	}
}

export default nextConfig
