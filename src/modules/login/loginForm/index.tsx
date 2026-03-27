'use client'
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useFormik } from 'formik'
import { getValidationSchema } from './helpers'
import { loginService } from '@/src/modules/login/services'
import { useParams, useRouter } from 'next/navigation'
import { notifications } from '@mantine/notifications'
import { useIntl } from 'react-intl'
import { useEffect } from 'react'

export const LoginForm = () => {
	const router = useRouter()
	const { locale } = useParams()
	const intl = useIntl()

	useEffect(() => {
		router.prefetch(`/${locale}/dashboard`)
	}, [])

	const formik = useFormik({
		initialValues: {
			username: '',
			password: ''
		},
		validationSchema: getValidationSchema(),
		onSubmit: async values => {
			try {
				await loginService.login(values)
				notifications.clean()
				notifications.show({
					color: 'green',
					message: intl.formatMessage({ id: 'LOGIN_SUCCESS' })
				})
				router.push(`/${locale}/dashboard`)
			} catch {
				notifications.show({
					color: 'red',
					message: intl.formatMessage({ id: 'NOT_LOGIN_OR_PASS' })
				})
			}
		}
	})

	return (
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
	)
}
