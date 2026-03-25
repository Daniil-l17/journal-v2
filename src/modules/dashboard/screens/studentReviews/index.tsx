'use client'

import { useQuery } from '@tanstack/react-query'
import { reviewsService } from '@/src/modules/dashboard/screens/studentReviews/services'
import { AsyncContent } from '@/src/modules/dashboard/components/asyncContent'
import { formatDateRu } from '@/src/utils/format-dates'

export const StudentReviews = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['reviews-list'],
		queryFn: () => reviewsService.getList()
	})

	const reviews = data ?? []

	const showReviews = !isLoading && !isError && reviews.length

	return (
		<div className='flex min-h-0 w-full min-w-0 flex-col gap-6 max-sm:gap-4'>
			<AsyncContent isLoading={isLoading} isError={isError} isEmpty={!reviews.length} />
			{showReviews && (
				<div className='rounded-lg border border-gray-200 bg-white'>
					<ul className='divide-y divide-gray-200'>
						{[...reviews].reverse().map((review, index) => (
							<li key={`${review.date}-${review.spec}-${index}`} className='px-7 py-7 max-sm:px-5 max-sm:py-6'>
								<div className='flex flex-row items-start justify-between gap-6 max-sm:flex-col max-sm:gap-3'>
									<p className='min-w-0 flex-1 text-lg font-semibold leading-snug text-gray-900 max-md:text-base'>
										{review.teacher} <span className='font-semibold text-gray-800'>({review.full_spec})</span>
									</p>
									<time
										className='shrink-0 pt-0.5 text-right text-lg tabular-nums text-gray-600 max-md:text-base max-sm:pt-0 max-sm:text-left'
										dateTime={review.date}
									>
										{formatDateRu(review.date, 'DD.MM.YYYY')}
									</time>
								</div>
								<p className='mt-2 text-lg text-gray-600 max-md:text-base max-sm:mt-3'>{review.message}</p>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}
