'use client'

import { Button } from '@mantine/core'
import { useEffect } from 'react'

type Props = {
	error: Error & { digest?: string }
	reset: () => void
}

const Error = ({ error, reset }: Props) => {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className='flex min-h-[80vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center'>
			<h1 className='text-2xl font-semibold text-gray-900'>Что-то пошло не так</h1>
			<p className='max-w-md text-sm text-gray-600'>{error.message || 'Произошла ошибка при загрузке страницы.'}</p>
			<Button onClick={() => reset()} color='primary' variant='light'>
				Попробовать снова
			</Button>
		</div>
	)
}

export default Error
