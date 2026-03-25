import { Header } from '@/src/modules/dashboard/layout/header'
import { Sidebar } from '@/src/modules/dashboard/layout/sidebar'
import { DashboardProviders } from '@/src/providers/dasboard'
import { type ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className='flex h-dvh w-full'>
			<Sidebar />
			<div className='flex flex-1 w-full flex-col overflow-hidden'>
				<Header />
				<DashboardProviders>{children}</DashboardProviders>
			</div>
		</div>
	)
}
