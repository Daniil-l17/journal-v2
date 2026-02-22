'use client'

import { Box } from '@mantine/core'

const SIDEBAR_WIDTH = 260

export function Sidebar() {
	return (
		<>
			<div
				className={`
        w-[300px] h-full bg-gray-100
        `}
				style={{ width: SIDEBAR_WIDTH }}
			>
				<Box p='md' className='border-b border-gray-200'>
					<span className='font-semibold text-gray-800'>Меню</span>
				</Box>
				<nav className='p-4'>
					<ul className='space-y-1'>
						<li>
							<a href='#' className='block rounded-md px-3 py-2 text-gray-700 hover:bg-gray-200'>
								Главная
							</a>
						</li>
						<li>
							<a href='#' className='block rounded-md px-3 py-2 text-gray-700 hover:bg-gray-200'>
								Раздел 1
							</a>
						</li>
						<li>
							<a href='#' className='block rounded-md px-3 py-2 text-gray-700 hover:bg-gray-200'>
								Раздел 2
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</>
	)
}
