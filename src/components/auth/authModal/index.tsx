'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Modal, Button, TextInput, PasswordInput } from '@mantine/core'
import { useModalStore } from '@/src/store/modal'
import { authService } from '@/src/services/auth'
import { toast } from 'sonner'
import { useParams, useRouter } from 'next/navigation'
import { useIntl } from 'react-intl'
import { validationSchema } from './helpers'

export function AuthModal() {
	const intl = useIntl()
	const { isOpen, closeModal } = useModalStore()
	const router = useRouter()
	const params = useParams()
	const locale = params.locale

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
				closeModal('auth')
				router.replace(`/${locale}/dashboard`)
			} catch {
				toast.error(intl.formatMessage({ id: 'NOT_LOGIN_OR_PASS' }))
			}
		}
	})

	const handleOnClose = () => {
		formik.resetForm()
		closeModal('auth')
	}

	return (
		<Modal
			opened={isOpen('auth')}
			onClose={handleOnClose}
			title={intl.formatMessage({ id: 'MYSTAT_ENTRANCE' })}
			centered
			size='lg'
			padding='xl'
			radius='md'
			overlayProps={{
				backgroundOpacity: 0.55,
				blur: 3
			}}
			styles={{
				title: {
					fontSize: '24px',
					fontWeight: 700,
					color: '#1f2937'
				}
			}}
		>
			<form onSubmit={formik.handleSubmit} autoComplete='on'>
				<div className='flex flex-col gap-6'>
					<div>
						<TextInput
							label={<span className='text-base font-semibold'>{intl.formatMessage({ id: 'username' })}</span>}
							placeholder={intl.formatMessage({ id: 'username_placeholder' })}
							id='auth-username'
							name='username'
							value={formik.values.username}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.username && formik.errors.username}
							required
							size='lg'
							radius='md'
							autoComplete='username'
							autoCorrect='off'
							autoCapitalize='none'
							spellCheck={false}
							styles={{
								input: {
									fontSize: '16px',
									padding: '12px 16px',
									height: '48px'
								}
							}}
						/>
					</div>

					<div>
						<PasswordInput
							label={<span className='text-base font-semibold'>{intl.formatMessage({ id: 'PASSWORD' })}</span>}
							placeholder={intl.formatMessage({ id: 'password_placeholder' })}
							id='auth-password'
							name='password'
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.password && formik.errors.password}
							required
							size='lg'
							radius='md'
							autoComplete='current-password'
							styles={{
								input: {
									fontSize: '16px',
									padding: '12px 16px',
									height: '48px'
								}
							}}
						/>
					</div>

					<Button
						type='submit'
						color='#d91842'
						fullWidth
						size='lg'
						radius='md'
						mt='md'
						loading={formik.isSubmitting}
						disabled={formik.isSubmitting || !formik.dirty || !!Object.keys(formik.errors).length}
						styles={{
							root: {
								height: '52px',
								fontSize: '16px',
								fontWeight: 600
							}
						}}
					>
						{intl.formatMessage({ id: 'LOGIN', defaultMessage: 'Войти' })}
					</Button>
				</div>
			</form>
		</Modal>
	)
}
