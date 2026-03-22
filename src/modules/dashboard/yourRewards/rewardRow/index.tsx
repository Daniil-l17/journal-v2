'use client'

import type { RowComponentProps } from 'react-window'
import { useIntl } from 'react-intl'
import type { RewardRowData } from './typed'
import { IconWallet } from '@/src/components/iconWallet'
import { formatDateRu } from '@/src/utils/format-dates'

export const RewardRow = ({ index, style, ariaAttributes, rewards }: RowComponentProps<RewardRowData>) => {
	const intl = useIntl()
	const reward = rewards[index]

	return (
		<li
			{...ariaAttributes}
			style={style}
			className='box-border flex list-none items-start justify-between gap-3 border-b border-transparent pr-2 leading-relaxed'
		>
			<div className='min-w-0 flex-1'>
				<div className='text-sm text-gray-600'>{formatDateRu(reward.date)}</div>
				<div className='mt-1 line-clamp-2 text-base font-medium text-gray-900'>{intl.formatMessage({ id: reward.achievements_name })}</div>
			</div>
			<div className='flex shrink-0 items-center gap-1.5'>
				<span className='text-base font-semibold leading-none text-gray-900'>+{reward.current_point}</span>
				<IconWallet type={reward.point_types_name === 'DIAMOND' ? 'TOPCOINS' : 'TOPGEMS'} size={18} />
			</div>
		</li>
	)
}
