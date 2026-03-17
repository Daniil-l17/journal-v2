import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	compiler: {
		removeConsole: true
	},
	images: {
		formats: ['image/avif', 'image/webp'],
		domains: ['fs.top-academy.ru']
	},
	compress: true,
	poweredByHeader: false,
	experimental: {
		optimizeCss: true
	},
	productionBrowserSourceMaps: false
}

export default nextConfig
