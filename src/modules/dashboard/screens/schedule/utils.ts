import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)

/** Понедельник текущей ISO-недели (00:00) */
export function getWeekMonday(d: dayjs.ConfigType) {
	return dayjs(d).startOf('isoWeek')
}
