import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	env: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_APPLICATION_KEY: process.env.NEXT_PUBLIC_APPLICATION_KEY
	}
}

export default nextConfig
