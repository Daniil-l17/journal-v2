import { Loader } from '@mantine/core'
import { FC } from 'react'
import { Props } from './typed'

export const AsyncContent: FC<Props> = ({ isLoading, isError, children, isEmpty, minHeight, customErrorText, customEmptyText }) => {
	if (!isLoading && !isError && !isEmpty) return children
	return (
		<div className='flex items-center justify-center' style={{ minHeight: minHeight ?? '70dvh' }}>
			{isLoading ? (
				<Loader type='bars' color='primary' />
			) : isError ? (
				<p className='text-red-500 font-semibold text-center text-lg'>
					{customErrorText ?? 'Не удалось получить данные. Обновите страницу.'}
				</p>
			) : (
				<p className='text-gray-900 font-semibold text-center text-lg'>{customEmptyText ?? 'Нет данных для отображения'}</p>
			)}
		</div>
	)
}
