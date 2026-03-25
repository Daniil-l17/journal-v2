import { useRef, useState } from 'react'
import { GripVertical } from 'lucide-react'
import { useSortable } from '@dnd-kit/react/sortable'

export const ScheduledExams = ({ sortableIndex }: { sortableIndex: number }) => {
	const [element, setElement] = useState<Element | null>(null)
	const handleRef = useRef<HTMLSpanElement>(null)
	const { isDragging } = useSortable({
		id: 'scheduledExams',
		index: sortableIndex,
		group: 'dashboard-bottom-blocks',
		element,
		handle: handleRef
	})

	return (
		<section
			ref={setElement}
			className={`flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm${isDragging ? ' opacity-60' : ''}`}
		>
			<div className='flex shrink-0 items-start justify-between gap-2 border-b border-gray-100 pl-4 pr-2 pt-4 pb-3'>
				<h3 className='min-w-0 text-lg font-bold leading-snug text-gray-900'>Назначенные экзамены</h3>
				<span
					ref={handleRef}
					className='inline-flex shrink-0 cursor-grab touch-none select-none text-gray-400 hover:text-gray-600 active:cursor-grabbing'
					role='img'
					aria-label='Переместить блок «Назначенные экзамены»'
				>
					<GripVertical size={18} strokeWidth={2.25} />
				</span>
			</div>
			<div className='flex min-h-0 flex-1 items-center justify-center px-4 py-8'>
				<p className='text-center text-base font-medium text-gray-500'>На текущий момент в разработке.</p>
			</div>
		</section>
	)
}
