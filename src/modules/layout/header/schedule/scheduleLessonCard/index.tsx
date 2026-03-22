import { FC } from 'react'
import { ScheduleLessonCardProps } from './typed'
import { Clock } from 'lucide-react'

export const ScheduleLessonCard: FC<ScheduleLessonCardProps> = ({ item }) => {
	return (
		<div className='flex cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
			<div className='flex w-8 shrink-0 items-center justify-center bg-accent text-sm font-bold text-white'>{item.lesson}</div>
			<div className='min-w-0 flex-1 flex flex-col gap-0.5 p-3'>
				<div className='flex items-center gap-1.5 text-gray-500'>
					<Clock size={14} className='shrink-0' />
					<span className='text-xs'>
						{item.started_at} — {item.finished_at}
					</span>
				</div>
				<div className='mt-1 text-sm truncate font-medium text-gray-800'>{item.subject_name}</div>
				<div className='text-xs text-gray-600'>{item.room_name}</div>
				<div className='text-xs text-gray-600'>{item.teacher_name}</div>
			</div>
		</div>
	)
}
