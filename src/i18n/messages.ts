import en from '@/src/assets/lang/en.json'
import es from '@/src/assets/lang/es.json'
import ru from '@/src/assets/lang/ru.json'
import tr from '@/src/assets/lang/tr.json'
import type { Locale } from '@/src/store/languages'

export type Messages = Record<string, string>

export const MESSAGES: Record<Locale, Messages> = {
  ru,
  en,
  es,
  tr
}
