import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	compiler: {
		removeConsole: true
	},
	images: {
		formats: ['image/avif', 'image/webp'],
		domains: ['fs.top-academy.ru'],
		minimumCacheTTL: 60 * 60 * 24 * 30
	},
	compress: true,
	poweredByHeader: false,
	experimental: {
		optimizeCss: true,
		optimizePackageImports: ['@mantine/core', '@mantine/hooks', 'lucide-react']
	},
	productionBrowserSourceMaps: false
	/*	async headers() {
		return [
						{
				source: '/_next/static/:path*',
				headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
			},
			{
				source: '/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico|css|js|woff|woff2|ttf|otf)',
				headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }]
			}
		]
	}*/
}

export default nextConfig
