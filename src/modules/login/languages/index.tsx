import { LANGUAGES } from '@/src/constants/languages'
import { Button } from '@mantine/core'
import { useParams } from 'next/navigation'

export const Languages = () => {
	const { locale } = useParams()
	return (
		<div className='flex flex-wrap gap-2 justify-center pt-6'>
			{LANGUAGES.map(language => {
				const isActive = language.code === locale
				return (
					<Button
						key={language.code}
						type='button'
						className={`
            ${isActive ? 'bg-accent!' : 'bg-transparent! mb-6 text-gray-500! hover:bg-site-button-hover!'}
          `}
					>
						{language.name}
					</Button>
				)
			})}
		</div>
	)
}
