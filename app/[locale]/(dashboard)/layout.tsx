import { Header } from '@/src/components/layout/header'
import { Sidebar } from '@/src/components/layout/sidebar'
import type { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div className='h-screen flex'>
			<Sidebar />
			<div className={`flex-1`}>
				<Header />
				<main className='p-4'>{children}</main>
			</div>
		</div>
	)
}
