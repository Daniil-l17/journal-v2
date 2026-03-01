import { Header } from '@/src/components/layout/header'
import { Sidebar } from '@/src/components/layout/sidebar'
import type { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div className='flex h-screen'>
			<Sidebar />
			<div className='flex flex-1 flex-col overflow-auto'>
				<Header />
				<main className='p-6 flex-1 bg-linear-to-b from-indigo-300 to-indigo-100'>{children}</main>
			</div>
		</div>
	)
}
