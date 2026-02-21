'use client'

import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import type { IntlShape } from 'react-intl'

type Values = Parameters<IntlShape['formatMessage']>[1]

export function useT() {
  const intl = useIntl()

  return useCallback(
    (id: string, values?: Values, defaultMessage?: string) =>
      intl.formatMessage({ id, defaultMessage }, values),
    [intl]
  )
}
