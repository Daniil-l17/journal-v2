'use client'

import { Clock } from 'lucide-react'
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { Props } from './typed'

export const WeekLessonCell: FC<Props> = ({ lesson }) => {
	const intl = useIntl()

	if (!lesson) {
		return (
			<div
				className={`relative flex min-h-[104px] flex-col rounded-md border border-gray-200 bg-white p-2 shadow-sm max-sm:min-h-[96px] items-center justify-center`}
			>
				<p className='px-1 text-center text-sm font-medium text-gray-500'>{intl.formatMessage({ id: 'schedule_no_lesson' })}</p>
			</div>
		)
	}

	return (
		<div className='relative flex min-h-[104px] flex-col rounded-md border border-gray-200 bg-white p-2 shadow-sm max-sm:min-h-[96px]'>
			<div className='pointer-events-none absolute top-2 right-2 max-w-[50%] text-right text-xs font-semibold leading-tight text-accent'>
				{lesson.room_name}
			</div>
			<div className='flex min-w-0 flex-col gap-1'>
				<div className='flex items-center gap-1.5 text-sm text-gray-600'>
					<Clock size={16} className='shrink-0' />
					<span className='tabular-nums'>
						{lesson.started_at} — {lesson.finished_at}
					</span>
				</div>
				<p className='line-clamp-3 text-sm font-semibold leading-snug text-gray-900'>{lesson.subject_name}</p>
				<p className='line-clamp-3 text-sm leading-snug text-gray-600'>{lesson.teacher_name}</p>
			</div>
		</div>
	)
}
