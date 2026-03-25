'use client'

import { feedbackService } from '@/src/services/feedback'
import type { EvaluateLessonItem } from '@/src/services/feedback/typed'
import { IconWallet } from '@/src/modules/dashboard/components/iconWallet'
import { EVALUATE_LESSON_TAGS } from './constants'
import { useQuery } from '@tanstack/react-query'
import { ActionIcon, Avatar, Badge, Button, Loader, Modal, Text } from '@mantine/core'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { notifications } from '@mantine/notifications'

dayjs.locale('ru')

type Answer = {
	rating: number
	tags: string[]
	comment: string
}

const emptyAnswer = (): Answer => ({ rating: 0, tags: [], comment: '' })

type Props = {
	opened: boolean
	onClose: () => void
}

export function EvaluateLessonModal({ opened, onClose }: Props) {
	const intl = useIntl()
	const [currentIndex, setCurrentIndex] = useState(0)
	const [answers, setAnswers] = useState<Record<string, Answer>>({})

	const {
		data: lessons = [],
		isLoading,
		isError,
		refetch
	} = useQuery({
		queryKey: ['feedback-evaluate-lesson-list'],
		queryFn: () => feedbackService.getEvaluateLessonList(),
		enabled: opened
	})

	const total = lessons.length
	const current = lessons[currentIndex] as EvaluateLessonItem | undefined
	const currentKey = current?.key

	const answer = useMemo(() => {
		if (!currentKey) return emptyAnswer()
		return answers[currentKey] ?? emptyAnswer()
	}, [answers, currentKey])

	const setAnswer = useCallback(
		(patch: Partial<Answer>) => {
			if (!currentKey) return
			setAnswers(prev => ({
				...prev,
				[currentKey]: { ...emptyAnswer(), ...prev[currentKey], ...patch }
			}))
		},
		[currentKey]
	)

	useEffect(() => {
		if (!opened) {
			setCurrentIndex(0)
			setAnswers({})
		}
	}, [opened])

	useEffect(() => {
		if (opened && total > 0 && currentIndex >= total) {
			setCurrentIndex(Math.max(0, total - 1))
		}
	}, [opened, total, currentIndex])

	const dateLabel = current ? dayjs(current.date_visit).format('D MMMM YYYY') : ''

	const goPrev = () => setCurrentIndex(i => Math.max(0, i - 1))
	const goNext = () => setCurrentIndex(i => Math.min(total - 1, i + 1))

	const toggleTag = (label: string) => {
		const next = answer.tags.includes(label) ? answer.tags.filter(t => t !== label) : [...answer.tags, label]
		setAnswer({ tags: next })
	}

	const handlePrimary = () => {
		if (!current || total === 0) return
		if (answer.rating < 1) {
			notifications.show({
				color: 'red',
				message: intl.formatMessage({ id: 'evaluate_lesson_rating_required' })
			})
			return
		}
		if (currentIndex < total - 1) {
			setCurrentIndex(i => i + 1)
			return
		}
		notifications.show({
			color: 'green',
			message: intl.formatMessage({ id: 'evaluate_lesson_submit_success' })
		})
		onClose()
	}

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			centered
			size={600}
			padding='lg'
			radius='md'
			title={
				<Text component='span' className='text-base font-bold text-gray-900'>
					{intl.formatMessage({ id: 'evaluate_lesson_title' })}
				</Text>
			}
			styles={{
				header: { marginBottom: 0 },
				body: { paddingTop: 12 }
			}}
		>
			{isLoading ? (
				<div className='flex min-h-[200px] items-center justify-center py-8'>
					<Loader type='bars' color='primary' />
				</div>
			) : isError ? (
				<div className='flex flex-col items-center gap-3 py-8'>
					<Text size='sm' c='dimmed' ta='center'>
						{intl.formatMessage({ id: 'evaluate_lesson_load_error' })}
					</Text>
					<Button variant='light' onClick={() => refetch()}>
						{intl.formatMessage({ id: 'evaluate_lesson_retry' })}
					</Button>
				</div>
			) : total === 0 ? (
				<Text size='sm' c='dimmed' ta='center' py='xl'>
					{intl.formatMessage({ id: 'evaluate_lesson_empty' })}
				</Text>
			) : (
				<div className='flex flex-col gap-4'>
					<div className='flex items-center gap-3'>
						<div className='h-px min-h-px flex-1 bg-primary' />
						<span className='shrink-0 text-sm font-medium text-gray-700'>
							{intl.formatMessage({ id: 'evaluate_lesson_progress' }, { current: currentIndex + 1, total })}
						</span>
						<div className='h-px min-h-px flex-1 bg-primary' />
					</div>

					<div className='relative flex items-center gap-2'>
						<ActionIcon
							type='button'
							variant='filled'
							color='primary'
							radius='xl'
							size='lg'
							disabled={currentIndex <= 0}
							onClick={goPrev}
							aria-label={intl.formatMessage({ id: 'evaluate_lesson_prev' })}
							className='shrink-0'
						>
							<ChevronLeft size={22} strokeWidth={2.5} className='text-white' />
						</ActionIcon>

						<div className='min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 py-4'>
							<div className='flex flex-col items-center gap-3 text-center'>
								<Avatar src={current?.teach_photo ?? undefined} size={72} radius='xl' alt=''>
									{(current?.fio_teach ?? '?').charAt(0)}
								</Avatar>
								<div className='min-w-0 space-y-1'>
									<p className='text-sm text-gray-800'>{current?.fio_teach}</p>
									<p className='text-base font-bold text-gray-900'>{current?.spec_name}</p>
									<p className='text-sm text-gray-600'>{dateLabel}</p>
								</div>
							</div>
						</div>

						<ActionIcon
							type='button'
							variant='filled'
							color='primary'
							radius='xl'
							size='lg'
							disabled={currentIndex >= total - 1}
							onClick={goNext}
							aria-label={intl.formatMessage({ id: 'evaluate_lesson_next_nav' })}
							className='shrink-0'
						>
							<ChevronRight size={22} strokeWidth={2.5} className='text-white' />
						</ActionIcon>
					</div>

					<div className='rounded-xl bg-gray-100 px-4 py-4'>
						<p className='mb-3 text-center text-sm font-medium text-gray-800'>
							{intl.formatMessage({ id: 'evaluate_lesson_rate_teacher' })}
						</p>
						<div className='flex justify-center gap-1'>
							{[1, 2, 3, 4, 5].map(n => (
								<button
									key={n}
									type='button'
									onClick={() => setAnswer({ rating: n })}
									className='cursor-pointer rounded p-0.5 text-amber-400 transition hover:scale-105'
									aria-label={`${n}`}
								>
									<Star size={36} strokeWidth={1.5} className={n <= answer.rating ? 'fill-amber-400' : 'fill-transparent'} />
								</button>
							))}
						</div>
					</div>

					<div className='flex flex-wrap justify-center gap-2'>
						{EVALUATE_LESSON_TAGS.map(tag => {
							const active = answer.tags.includes(tag)
							return (
								<Badge
									key={tag}
									variant='outline'
									color={active ? 'primary' : 'gray'}
									size='lg'
									radius='xl'
									className='cursor-pointer px-3 py-2 text-xs font-medium normal-case'
									styles={{
										root: {
											cursor: 'pointer',
											borderWidth: 1,
											...(active ? { backgroundColor: 'var(--mantine-color-primary-light)' } : {})
										}
									}}
									onClick={() => toggleTag(tag)}
								>
									{tag}
								</Badge>
							)
						})}
					</div>

					<div>
						<Text size='sm' fw={500} mb={6} component='label' htmlFor='evaluate-lesson-comment'>
							{intl.formatMessage({ id: 'evaluate_lesson_comment' })}
						</Text>
						<textarea
							id='evaluate-lesson-comment'
							placeholder={intl.formatMessage({ id: 'evaluate_lesson_comment_placeholder' })}
							value={answer.comment}
							onChange={e => setAnswer({ comment: e.target.value.slice(0, 500) })}
							maxLength={500}
							rows={6}
							className='w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'
							style={{ maxHeight: '180px', height: '70px', minHeight: '70px' }}
						/>
						<Text size='xs' c='dimmed' ta='right' mt={6}>
							{answer.comment.length} / 500
						</Text>
					</div>

					<div className='flex flex-col items-center gap-3 border-t border-gray-100 pt-2'>
						<p className='flex flex-wrap items-center justify-center gap-1.5 text-center text-sm text-gray-800'>
							<span>{intl.formatMessage({ id: 'evaluate_lesson_bonus_prefix' })}</span>
							<IconWallet type='TOPCOINS' size={20} />
							<span>{intl.formatMessage({ id: 'evaluate_lesson_bonus_suffix' })}</span>
						</p>
						<Button fullWidth size='md' color='primary' radius='md' onClick={handlePrimary}>
							{currentIndex < total - 1
								? intl.formatMessage({ id: 'evaluate_lesson_next' })
								: intl.formatMessage({ id: 'evaluate_lesson_submit' })}
						</Button>
						<Text size='xs' c='dimmed' ta='center' maw={400}>
							{intl.formatMessage({ id: 'evaluate_lesson_disclaimer' })}
						</Text>
					</div>
				</div>
			)}
		</Modal>
	)
}
