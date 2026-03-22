import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

export const formatDateRu = (raw: string, template?: string): string => {
	const normalized = raw.trim().replace(' ', 'T')
	const date = dayjs(normalized)
	return date.isValid() ? date.format(template ?? 'DD.MM.YYYY HH:mm:ss') : raw
}
