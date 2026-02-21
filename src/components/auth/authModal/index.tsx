'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Modal, Button, TextInput, PasswordInput } from '@mantine/core'
import { useModalStore } from '@/src/store/modal'
import { authService } from '@/src/services/auth'
import { toast } from 'sonner'
import { useParams, useRouter } from 'next/navigation'
import { DEFAULT_LOCALE, isLocale } from '@/src/store/languages'
import { useT } from '@/src/i18n/useT'


const validationSchema = Yup.object({
  username: Yup.string().required('Логин обязателен для заполнения').min(1),
  password: Yup.string().required('Пароль обязателен для заполнения').min(1)
})

export function AuthModal() {
  const t = useT()
  const { isOpen, closeModal } = useModalStore()
  const router = useRouter()
  const params = useParams<{ locale?: string }>()
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE
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
        router.push(`/${locale}/dashboard`)
      }
      catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : t('error', undefined, 'Ошибка'))
      }
    },
  })

  return (
    <Modal
      opened={isOpen('auth')}
      onClose={() => closeModal('auth')}
      title={t('MYSTAT_ENTRANCE', undefined, 'Вход в аккаунт')}
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
              label={<span className='text-base font-semibold'>{t('username', undefined, 'Логин')}</span>}
              placeholder='Введите ваш логин'
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
              label={<span className='text-base font-semibold'>{t('PASSWORD', undefined, 'Пароль')}</span>}
              placeholder='Введите ваш пароль'
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
            disabled={formik.isSubmitting || !formik.dirty || Object.keys(formik.errors).length > 0}
            styles={{
              root: {
                height: '52px',
                fontSize: '16px',
                fontWeight: 600
              }
            }}
          >
            {t('LOGIN', undefined, 'Войти')}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
