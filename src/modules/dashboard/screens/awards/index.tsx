'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useIntl } from 'react-intl'
import { awardsService } from '@/src/modules/dashboard/screens/awards/services'
import { getAwardImageSrc } from '@/src/modules/dashboard/screens/awards/helpers'
import { IconWallet } from '@/src/modules/dashboard/components/iconWallet'
import { AsyncContent } from '@/src/modules/dashboard/components/asyncContent'

export const Awards = () => {
	const intl = useIntl()
	const { data, isLoading, isError } = useQuery({
		queryKey: ['profile-student-achievements'],
		queryFn: () => awardsService.getStudentAchievements()
	})

	const awards = data ?? []

	return (
		<div className='flex min-h-0 w-full min-w-0 flex-col gap-6 max-lg:gap-5 max-sm:gap-4'>
			<AsyncContent isLoading={isLoading} isError={isError} isEmpty={!awards.length}>
				<ul className='grid grid-cols-4 items-stretch gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-3'>
					{awards.map(achievement => (
						<li
							key={achievement.id}
							className='relative grid aspect-square min-h-0 min-w-0 grid-rows-[minmax(0,1fr)_auto] overflow-hidden rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm max-sm:p-2.5'
						>
							<div
								className='pointer-events-none absolute top-4 right-4 z-10 flex items-center gap-1 max-sm:top-1.5 max-sm:right-1.5'
								aria-label={`+${achievement.achieve_points[0]?.points_count ?? 0} TOP Coins`}
							>
								<span className='text-base font-bold tabular-nums text-gray-900 max-sm:text-sm'>
									+{achievement.achieve_points[0]?.points_count ?? 0}
								</span>
								<IconWallet type='TOPCOINS' size={22} />
							</div>

							<div className='relative min-h-0 min-w-0'>
								<Image
									src={getAwardImageSrc(achievement.translate_key)}
									alt=''
									draggable={false}
									fill
									className='object-contain'
									style={achievement.is_active ? undefined : { filter: 'brightness(0.2) grayscale(1)' }}
								/>
							</div>

							<div className='flex w-full min-w-0 shrink-0 flex-col items-center pt-2'>
								<p className='line-clamp-3 min-h-12 w-full max-w-full wrap-break-word px-0.5 text-center font-medium leading-snug text-gray-800'>
									{intl.formatMessage({
										id: achievement.translate_key
									})}
								</p>
							</div>
						</li>
					))}
				</ul>
			</AsyncContent>
		</div>
	)
}
