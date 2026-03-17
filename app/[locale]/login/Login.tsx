'use client'

import { Button, Loader, PasswordInput, TextInput } from '@mantine/core'
import { useFormik } from 'formik'
import { useParams, useRouter } from 'next/navigation'
import { useIntl } from 'react-intl'
import Image from 'next/image'
import Lottie from 'lottie-react'
import { notifications } from '@mantine/notifications'
import { authService } from '@/src/services/auth'
import animationRobot from '@/src/assets/animation/authRobot.json'
import * as Yup from 'yup'
import { LANGUAGES } from '@/src/constants/languages'
import { useState } from 'react'

export default function Login() {
	const intl = useIntl()
	const params = useParams()
	const router = useRouter()
	const locale = params.locale
	const [lottieLoaded, setLottieLoaded] = useState(false)

	const handleLottieLoaded = () => {
		setLottieLoaded(true)
	}

	const validationSchema = Yup.object({
		username: Yup.string()
			.required(intl.formatMessage({ id: 'validation_username_required' }))
			.min(1),
		password: Yup.string()
			.required(intl.formatMessage({ id: 'validation_password_required' }))
			.min(1)
	})
	const formik = useFormik({
		initialValues: {
			username: '',
			password: ''
		},
		validationSchema,
		onSubmit: async values => {
			try {
				await authService.login(values)
				formik.resetForm()
				router.replace(`/${locale}/dashboard`)
			} catch {
				notifications.show({
					color: 'red',
					position: 'top-right',
					message: intl.formatMessage({ id: 'NOT_LOGIN_OR_PASS' })
				})
			}
		}
	})

	return (
		<div className='flex'>
			<div className='relative w-1/2 overflow-hidden max-lg:hidden'>
				<Image draggable={false} src='/first_screen.jpg' alt='' fill className='object-cover' priority />
				<div className='pointer-events-none absolute inset-0 bg-linear-to-tr from-black/40 via-black/20 to-transparent' />
			</div>

			<div className='flex w-1/2 justify-center py-12 max-lg:w-full px-2 h-screen overflow-y-auto'>
				<div className='w-full max-w-[800px] px-2'>
					<div className='mb-6 flex justify-center'>
						<div className='relative flex justify-center items-center w-[180px] h-[180px] max-sm:w-[120px] max-sm:h-[120px] mx-auto'>
							<Lottie
								className='max-w-[180px] h-[180px] max-sm:max-w-[120px] max-sm:h-[120px]'
								animationData={animationRobot}
								loop
								onDOMLoaded={handleLottieLoaded}
							/>
							{!lottieLoaded && (
								<div className='absolute inset-0 flex items-center justify-center'>
									<Loader size='xs' color='red' className='rounded' />
								</div>
							)}
						</div>
					</div>

					<div className='mb-6 text-center'>
						<h1 className='text-[40px] font-bold leading-tight wrap-break-word max-sm:text-3xl'>
							{intl.formatMessage({ id: 'login_title' })}
							<span className='text-accent'>{intl.formatMessage({ id: 'login_title_accent' })}</span>
						</h1>
						<p className='mt-3 text-sm text-site-text-secondary'>{intl.formatMessage({ id: 'login_description' })}</p>
					</div>

					<form onSubmit={formik.handleSubmit} autoComplete='on'>
						<TextInput
							label={<span className='text-xs font-semibold'>{intl.formatMessage({ id: 'username' })}</span>}
							placeholder={intl.formatMessage({ id: 'username_placeholder' })}
							id='auth-username'
							name='username'
							value={formik.values.username}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.username && formik.errors.username}
							required
							size='md'
							radius='md'
							autoComplete='username'
							className='h-[90px]'
						/>

						<PasswordInput
							label={<span className='text-xs font-semibold'>{intl.formatMessage({ id: 'PASSWORD' })}</span>}
							placeholder={intl.formatMessage({ id: 'password_placeholder' })}
							id='auth-password'
							name='password'
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.password && formik.errors.password}
							required
							size='md'
							radius='md'
							autoComplete='current-password'
							className='h-[90px]'
						/>

						<Button
							type='submit'
							color='primary'
							size='md'
							fullWidth
							radius='md'
							loading={formik.isSubmitting}
							disabled={formik.isSubmitting || !formik.dirty || !!Object.keys(formik.errors).length}
							className='mt-2 text-sm font-semibold'
						>
							{intl.formatMessage({ id: 'LOGIN', defaultMessage: 'Войти' })}
						</Button>
					</form>
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
				</div>
			</div>
		</div>
	)
}
