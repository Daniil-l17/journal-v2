'use client'

import { useProfile } from '@/src/modules/dashboard/hooks/useProfile'
import { Button, Burger, Popover, Skeleton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { CalendarClock, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import ReactCountryFlag from 'react-country-flag'
import { BurgerDrawer } from '@/src/modules/dashboard/layout/header/burgerDrawer'
import { EvaluateLessonModal } from '@/src/modules/dashboard/layout/header/evaluateLessonModal'
import { Schedule } from '@/src/modules/dashboard/layout/header/schedule'
import { useIntl } from 'react-intl'
import { IconWallet } from '@/src/modules/dashboard/components/iconWallet'

export const Header = () => {
	const intl = useIntl()
	const { locale } = useParams<{ locale: string }>()
	const { data, isLoading } = useProfile()
	const [drawerOpened, { close: closeDrawer, toggle: toggleDrawer }] = useDisclosure(false)
	const [evaluateOpened, { open: openEvaluate, close: closeEvaluate }] = useDisclosure(false)

	return (
		<>
			<header className='sticky top-0 z-20 flex min-h-[80px] shrink-0 items-center justify-between gap-3 border-b border-gray-200 bg-white px-7 max-xl:px-6 max-md:px-4'>
				<div className='flex min-w-0 flex-1 items-center gap-8 max-lg:gap-5 max-md:gap-3'>
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
								<div className='flex flex-col gap-2'>
									<Skeleton height={18} width={240} className='max-w-[300px] max-md:max-w-[200px]' />
									<Skeleton height={14} width={160} className='max-w-[180px] max-md:max-w-[150px]' />
								</div>
							) : (
								<>
									<span className='truncate text-base font-semibold text-gray-900 max-md:text-sm'>{data?.full_name}</span>
									<span className='truncate text-sm text-gray-500 max-md:text-xs'>Группа: {data?.group_name}</span>
								</>
							)}
						</div>
					</div>
					<div className='flex items-center gap-4 max-md:hidden'>
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

				<div className='flex shrink-0 items-center justify-end gap-2'>
					{isLoading ? (
						<>
							<Skeleton height={40} width={160} />
							<Skeleton height={40} width={140} />
						</>
					) : (
						<>
							<Button
								type='button'
								variant='subtle'
								color='gray'
								disabled
								size='md'
								aria-label={intl.formatMessage({ id: 'evaluate_lesson_open' })}
								w={40}
								h={40}
								className='p-0! bg-gray-100!'
								onClick={openEvaluate}
							>
								<Star size={22} strokeWidth={2} />
							</Button>
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
										className='p-0! bg-gray-100!'
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
							<Button
								type='button'
								variant='subtle'
								color='gray'
								size='md'
								disabled
								aria-label='Текущая локаль'
								w={40}
								h={40}
								className='p-0! bg-gray-100!'
							>
								<ReactCountryFlag svg countryCode={locale} style={{ width: '22px', height: '22px' }} />
							</Button>

							<div className='h-7 w-px shrink-0 bg-gray-200' aria-hidden />
							<Link
								href='https://myclass.team/?utm_source=journal&utm_medium=account'
								target='_blank'
								rel='noopener noreferrer'
								aria-label='Открыть Классно!'
							>
								<Image
									priority
									src='/header/my-class-logo.png'
									alt='Классно!'
									width={300}
									height={300}
									className='h-[40px] w-auto object-contain'
								/>
							</Link>
							<Link
								href='https://max.ru/join/vYyNZJIaNJDrqdSuNf5iJJ9nlx437wmnIm_bn0t3L70?clckid=b6eb7cea'
								target='_blank'
								rel='noopener noreferrer'
								aria-label='Открыть MAX'
							>
								<Image priority src='/header/max-logo.png' alt='MAX' width={300} height={300} className='h-[40px] w-auto object-contain' />
							</Link>

							<div className='hidden max-md:flex'>
								<Burger opened={drawerOpened} onClick={toggleDrawer} aria-label='Меню' size='sm' />
							</div>
						</>
					)}
				</div>
			</header>

			<BurgerDrawer opened={drawerOpened} onClose={closeDrawer} />
			<EvaluateLessonModal opened={evaluateOpened} onClose={closeEvaluate} />
		</>
	)
}
