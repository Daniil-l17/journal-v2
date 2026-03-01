'use client'

import { useState } from 'react'
import { Button, Loader } from '@mantine/core'
import { useParams } from 'next/navigation'
import { useModalStore } from '@/src/store/modal'
import { AuthModal } from '@/src/components/auth/authModal'
import { useIntl } from 'react-intl'
import Lottie from 'lottie-react'
import animationRobot from '@/src/assets/animation/authRobot.json'

const LANGUAGES = [
	{ code: 'ru', name: 'Русский' },
	{ code: 'en', name: 'English' },
	{ code: 'zh', name: '中文' },
	{ code: 'es', name: 'Español' },
	{ code: 'hi', name: 'हिन्दी' },
	{ code: 'ar', name: 'العربية' },
	{ code: 'pt', name: 'Português' },
	{ code: 'ja', name: '日本語' },
	{ code: 'de', name: 'Deutsch' },
	{ code: 'fr', name: 'Français' },
	{ code: 'ko', name: '한국어' },
	{ code: 'id', name: 'Bahasa Indonesia' },
	{ code: 'tr', name: 'Türkçe' },
	{ code: 'vi', name: 'Tiếng Việt' },
	{ code: 'th', name: 'ไทย' },
	{ code: 'it', name: 'Italiano' },
	{ code: 'pl', name: 'Polski' },
	{ code: 'nl', name: 'Nederlands' },
	{ code: 'bn', name: 'বাংলা' }
] as const

export default function Login() {
	const [lottieLoaded, setLottieLoaded] = useState(false)
	const intl = useIntl()
	const { openModal } = useModalStore()
	const params = useParams()
	const currentLocale = params.locale

	const handleLottieLoaded = () => {
		setLottieLoaded(true)
	}

	return (
		<div className='relative bg-gradient-to-b from-indigo-300 to-white overflow-y-auto flex h-screen py-18 justify-center px-4 lg:px-8'>
			<AuthModal />
			<div className='w-full max-w-5xl text-center flex flex-col'>
				<div className='relative flex justify-center items-center w-[210px] h-[210px] mx-auto'>
					<Lottie className='max-w-[210px] h-[210px]' animationData={animationRobot} loop onDOMLoaded={handleLottieLoaded} />
					{!lottieLoaded && (
						<div className='absolute inset-0 flex items-center justify-center'>
							<Loader size='xs' color='red' className='rounded' />
						</div>
					)}
				</div>
				<div className='flex w-full flex-col gap-4 lg:gap-6'>
					<h2 className='text-4xl lg:text-6xl font-bold leading-tight wrap-break-word'>
						{intl.formatMessage({ id: 'login_title' })}
						<span className='text-accent'>{intl.formatMessage({ id: 'login_title_accent' })}</span>
					</h2>
					<p className='text-base text-site-text-secondary lg:text-lg'>{intl.formatMessage({ id: 'login_description' })}</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button color='primary' size='lg' radius='md' miw={300} className='px-8' onClick={() => openModal('auth')}>
							{intl.formatMessage({ id: 'LOGIN' })}
						</Button>
					</div>
					<div className='flex flex-wrap gap-2 justify-center pt-4'>
						{LANGUAGES.map(language => {
							const isActive = language.code === currentLocale
							return (
								<Button
									key={language.code}
									type='button'
									className={`
                    ${isActive ? 'bg-accent!' : 'bg-transparent! text-gray-500! hover:bg-site-button-hover!'}
                  `}
								>
									{language.name}
								</Button>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}
