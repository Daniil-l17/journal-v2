'use client'

import { useProfile } from '@/src/hooks/useProfile'

export function Header() {
	const { data } = useProfile()

	console.log(data)

	return <header className='sticky top-0 z-20 flex h-20 items-center gap-4 bg-white px-4'></header>
}
