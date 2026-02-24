'use client'

import { useProfile } from '@/src/hooks/useProfile'
import { Avatar, Button, Skeleton, Tooltip } from '@mantine/core'
import { LogOut } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import Cookies from 'js-cookie'
import Image from 'next/image'

import topmoneyImg from '/header/TOPMONEY.png'
import topcoinsImg from '/header/TOPCOINS.png'
import topgemsImg from '/header/TOPGEMS.png'

const GAMING_ICONS = [topmoneyImg, topcoinsImg, topgemsImg] as const

const POINT_LABELS = ['Топденьги (всего)', 'Топкоины', 'Гемы'] as const

export function Header() {
	const { data, isLoading } = useProfile()
	const router = useRouter()
	const locale = useParams()

	const handleLogout = () => {
		/*		Cookies.remove('access_token')
		Cookies.remove('refresh_token')
		router.push(`/${locale}/login`)*/
	}

	return (
		<header className='sticky top-0 z-20 border-b border-gray-200 flex h-24 items-center justify-between gap-4 px-8'>
			<div className='flex items-center gap-4'>
				{isLoading ? <Skeleton circle height={65} width={65} /> : <Avatar src={data.photo} alt={data.full_name} radius='xl' size={65} />}
				<div className='flex min-w-0 flex-wrap items-center gap-15'>
					{isLoading ? (
						<>
							<div className='flex flex-col gap-1'>
								<Skeleton height={20} width={200} />
								<Skeleton height={16} width={140} />
							</div>
						</>
					) : (
						<>
							<div className='flex flex-col gap-1'>
								<span className='truncate text-base font-semibold text-gray-900'>{data.full_name}</span>
								<span className='text-sm text-gray-500'>Группа: {data.group_name}</span>
							</div>
							<div className='flex items-center gap-6'>
								<Tooltip label={POINT_LABELS[0]} withArrow position='bottom'>
									<div className='flex cursor-pointer items-center gap-2'>
										<span className='text-sm font-semibold text-gray-900'>
											{data.gaming_points[0].points + data.gaming_points[1].points}
										</span>
										<Image src={GAMING_ICONS[0]} alt='' width={14} height={18} className='object-contain' />
									</div>
								</Tooltip>
								<div className='flex items-center gap-4 rounded-2xl bg-gray-100 px-4 py-4'>
									<Tooltip label={POINT_LABELS[1]} withArrow position='bottom'>
										<div className='flex cursor-pointer items-center gap-2'>
											<span className='text-sm font-semibold text-gray-900'>{data.gaming_points[0].points}</span>
											<Image src={GAMING_ICONS[1]} alt='' width={18} height={18} className='object-contain' />
										</div>
									</Tooltip>
									<Tooltip label={POINT_LABELS[2]} withArrow position='bottom'>
										<div className='flex cursor-pointer items-center gap-2'>
											<span className='text-sm font-semibold text-gray-900'>{data.gaming_points[1].points}</span>
											<Image src={GAMING_ICONS[2]} alt='' width={18} height={18} className='object-contain' />
										</div>
									</Tooltip>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
			<div className='flex items-center gap-2'>
				{!isLoading && (
					<Button variant='subtle' color='gray' size='sm'>
						О Проекте
					</Button>
				)}
				{isLoading ? (
					<Skeleton height={40} width={40} />
				) : (
					<Button variant='subtle' color='gray' size='md' onClick={handleLogout} aria-label='Выйти' w={40} h={40} className='p-0!'>
						<LogOut size={22} strokeWidth={2} />
					</Button>
				)}
			</div>
		</header>
	)
}
