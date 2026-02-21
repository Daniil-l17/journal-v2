'use client'

import { LanguageSelect } from '@/src/components/i18n/LanguageSelect'
import { useT } from '@/src/i18n/useT'

export default function Dashboard() {
  const t = useT()
  return (
    <div className='p-6'>
      <div className='mb-4'>
        <LanguageSelect />
      </div>
      <div className='text-xl font-semibold'>Dashboard</div>
      <div className='mt-2 opacity-70'>{t('TEST_I18N', undefined, 'Тест локализации')}</div>
    </div>
  )
}
