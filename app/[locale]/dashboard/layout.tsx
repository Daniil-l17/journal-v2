import { Header } from '@/src/modules/layout/header'
import { PageTitle } from '@/src/modules/layout/pageTitle'
import { Sidebar } from '@/src/modules/layout/sidebar'
import type { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div className='flex h-screen'>
			<Sidebar />
			<div className='flex flex-1 flex-col '>
				<Header />
				<main className='flex flex-1 overflow-auto flex-col bg-linear-to-b from-indigo-300 to-indigo-100 p-6'>
					<div className='mb-4'>
						<PageTitle />
						{children}
					</div>
				</main>
			</div>
		</div>
	)
}
