import { TopChartId } from '../components/topCharts/typed'
import type { BottomBlockId } from '../components/bottomBlocks/typed'

export const DEFAULT_TOP_CHARTS_ORDER: TopChartId[] = ['attendance', 'grades']
export const DASHBOARD_TOP_CHARTS_ORDER_COOKIE = 'dashboard_top_charts_order'

export const DEFAULT_BOTTOM_BLOCKS_ORDER: BottomBlockId[] = ['yourRewards', 'leaderboard', 'scheduledExams']
export const DASHBOARD_BOTTOM_BLOCKS_ORDER_COOKIE = 'dashboard_bottom_blocks_order'

export const MONTHS_SHORT_RU = ['янв.', 'февр.', 'март.', 'апр.', 'май.', 'июнь.', 'июль.', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.']
export const MONTHS_FULL_RU = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь'
]
