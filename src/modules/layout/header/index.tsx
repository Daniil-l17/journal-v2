'use client'

import { useProfile } from '@/src/hooks/useProfile'
import { Button, Burger, Popover, Skeleton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { CalendarClock } from 'lucide-react'
import Image from 'next/image'

import { BurgerDrawer } from '@/src/modules/layout/header/burgerDrawer'
import { Schedule } from '@/src/modules/layout/header/schedule'
import { IconWallet } from '@/src/components/iconWallet'

export function Header() {
	const { data, isLoading } = useProfile()
	const [drawerOpened, { close: closeDrawer, toggle: toggleDrawer }] = useDisclosure(false)

	return (
		<>
			<header className='sticky top-0 z-20 flex min-h-[80px] shrink-0 items-center justify-between gap-16 border-b border-gray-200 bg-white px-8 max-md:gap-4 max-md:px-4'>
				<div className='flex min-w-0 flex-initial items-center gap-14 max-md:flex-1 max-md:gap-4'>
					<div className='flex min-w-0 items-center gap-3'>
						{isLoading ? (
							<Skeleton circle height={60} width={60} className='h-[60px] w-[60px] shrink-0 max-md:h-9 max-md:w-9' />
						) : (
							<Image
								priority
								src={data?.photo ?? ''}
								alt={data?.full_name ?? ''}
								width={100}
								height={100}
								className='h-[60px] w-[60px] shrink-0 rounded-full object-cover object-center max-md:h-13 max-md:w-13'
							/>
						)}
						<div className='flex min-w-0 flex-col gap-0.5'>
							{isLoading ? (
								<>
									<Skeleton height={18} width={140} className='max-w-[300px] max-md:max-w-[200px]' />
									<Skeleton height={14} width={100} className='max-w-[180px] max-md:max-w-[150px]' />
								</>
							) : (
								<>
									<span className='truncate text-base font-semibold text-gray-900 max-md:text-sm'>{data?.full_name}</span>
									<span className='text-sm text-gray-500 max-md:text-xs'>Группа: {data?.group_name}</span>
								</>
							)}
						</div>
					</div>
					<div className='flex items-center gap-6 max-md:hidden'>
						{!isLoading && data && (
							<>
								<div className='flex cursor-pointer items-center gap-2'>
									<span className='text-sm font-semibold text-gray-900'>{data.gaming_points[0].points + data.gaming_points[1].points}</span>
									<IconWallet type='TOPMONEY' size={18} />
								</div>
								<div className='flex items-center gap-4 rounded-2xl bg-gray-100 px-4 py-4'>
									<div className='flex cursor-pointer items-center gap-2'>
										<span className='text-sm font-semibold text-gray-900'>{data.gaming_points[0].points}</span>
										<IconWallet type='TOPCOINS' size={18} />
									</div>
									<div className='flex cursor-pointer items-center gap-2'>
										<span className='text-sm font-semibold text-gray-900'>{data.gaming_points[1].points}</span>
										<IconWallet type='TOPGEMS' size={18} />
									</div>
								</div>
							</>
						)}
					</div>
				</div>

				<div className='min-w-0 flex-1 max-md:w-0 max-md:flex-none' />

				<div className='flex shrink-0 items-center justify-end gap-2'>
					{isLoading ? (
						<>
							<Skeleton height={40} width={40} />
						</>
					) : (
						<>
							<Popover
								position='bottom-end'
								shadow='md'
								withArrow
								withinPortal
								closeOnEscape
								zIndex={400}
								styles={{
									dropdown: {
										padding: 0,
										borderRadius: '12px',
										border: '1px solid #e0e0e0',
										overflow: 'hidden'
									}
								}}
							>
								<Popover.Target>
									<Button
										type='button'
										variant='subtle'
										color='gray'
										size='md'
										aria-label='Расписание'
										aria-haspopup='dialog'
										w={40}
										h={40}
										className='p-0!'
									>
										<CalendarClock size={22} strokeWidth={2} />
									</Button>
								</Popover.Target>
								<Popover.Dropdown>
									<div className='flex h-[min(640px,80vh)] w-[400px] min-h-0 flex-col'>
										<Schedule />
									</div>
								</Popover.Dropdown>
							</Popover>

							<div className='hidden max-md:flex'>
								<Burger opened={drawerOpened} onClick={toggleDrawer} aria-label='Меню' size='sm' />
							</div>
						</>
					)}
				</div>
			</header>

			<BurgerDrawer opened={drawerOpened} onClose={closeDrawer} />
		</>
	)
}
