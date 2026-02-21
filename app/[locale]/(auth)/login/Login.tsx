'use client'

import { Button } from '@mantine/core'
import { useModalStore } from '@/src/store/modal'
import { AuthModal } from '@/src/components/auth/authModal'
import { LanguageSelect } from '@/src/components/i18n/LanguageSelect'
import { useT } from '@/src/i18n/useT'

export default function Login() {
  const t = useT()
  const { openModal } = useModalStore()

  return (
    <div className='relative flex min-h-svh items-center justify-center bg-color-background px-4 sm:px-8'>
      <div className='absolute right-4 top-4 sm:right-8 sm:top-8'>
        <LanguageSelect />
      </div>
      <div className='w-full max-w-5xl text-center p-4 flex flex-col gap-4 sm:gap-6'>
        <h2 className='text-4xl sm:text-6xl font-bold leading-tight wrap-break-word'>
          Электронный журнал нового поколения
          <span className='text-accent'> для студентов IT TOP</span>
        </h2>
        <p className='text-base sm:text-lg'>
          Платформа, которая упрощает учебный процесс. Отслеживайте расписание, оценки и домашние задания в удобном формате — все
          необходимые инструменты собраны в приятном интерфейсе.
        </p>
        <p className='text-sm sm:text-base opacity-70'>{t('TEST_I18N', undefined, 'Тест локализации')}</p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button color='#d91842' size='lg' radius='md' className='px-8' onClick={() => openModal('auth')}>
            {t('LOGIN', undefined, 'Войти в аккаунт')}
          </Button>
        </div>
      </div>
      <AuthModal />
    </div>
  )
}
