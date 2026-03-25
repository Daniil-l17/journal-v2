import { Loader } from '@mantine/core'
import { FC } from 'react'
import { Props } from './typed'

export const AsyncContent: FC<Props> = ({ isLoading, isError, isEmpty }) => {
	if (!isLoading && !isError && !isEmpty) return null
	return (
		<div className='flex min-h-[70dvh] items-center justify-center'>
			{isLoading ? (
				<Loader type='bars' color='primary' />
			) : isError ? (
				<p className='text-red-500 font-semibold text-center text-lg'>Не удалось получить данные. Обновите страницу.</p>
			) : isEmpty ? (
				<p className='text-gray-900 font-semibold text-center text-lg'>Нет данных для отображения</p>
			) : null}
		</div>
	)
}
