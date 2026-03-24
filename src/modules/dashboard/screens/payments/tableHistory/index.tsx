'use client'

import { type FC } from 'react'
import { ScrollArea, Table } from '@mantine/core'
import { formatDateRu } from '@/src/utils/format-dates'
import type { Props } from './typed'

export const TableHistory: FC<Props> = ({ data }) => {
	return (
		<section className='flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
			<h3 className='border-b border-gray-100 px-4 pt-4 pb-3 text-lg font-semibold text-gray-900 max-sm:px-3 max-sm:pt-3 max-sm:text-base'>
				История платежей
			</h3>
			<div className='min-h-0 flex-1 p-4 max-sm:p-3'>
				{!data.length ? (
					<p className='py-8 text-center text-sm text-gray-500'>Нет платежей</p>
				) : (
					<ScrollArea type='auto' offsetScrollbars className='max-w-full'>
						<Table highlightOnHover withTableBorder withColumnBorders className='min-w-[420px]'>
							<Table.Thead>
								<Table.Tr>
									<Table.Th className='bg-accent px-3 py-2.5 text-center text-sm font-semibold text-white max-sm:px-2 max-sm:py-2 max-sm:text-xs'>
										Дата
									</Table.Th>
									<Table.Th className='bg-accent px-3 py-2.5 text-center text-sm font-semibold text-white max-sm:px-2 max-sm:py-2 max-sm:text-xs'>
										Назначение платежа
									</Table.Th>
									<Table.Th className='bg-accent px-3 py-2.5 text-center text-sm font-semibold text-white max-sm:px-2 max-sm:py-2 max-sm:text-xs'>
										Оплачено
									</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{data.map((row, i) => (
									<Table.Tr key={`${row.date}-${i}`}>
										<Table.Td className='border border-gray-200 px-3 py-2.5 text-start text-sm text-gray-800 max-sm:px-2 max-sm:py-2 max-sm:text-xs'>
											{formatDateRu(row.date, 'DD.MM.YYYY')}
										</Table.Td>
										<Table.Td className='max-w-[min(100%,420px)] border border-gray-200 px-3 py-2.5 text-start text-sm text-gray-800 wrap-break-word max-sm:px-2 max-sm:py-2 max-sm:text-xs'>
											{row.description}
										</Table.Td>
										<Table.Td className='border border-gray-200 px-3 py-2.5 text-start text-sm text-gray-800 max-sm:px-2 max-sm:py-2 max-sm:text-xs'>
											{row.amount.toLocaleString('ru-RU')}
										</Table.Td>
									</Table.Tr>
								))}
							</Table.Tbody>
						</Table>
					</ScrollArea>
				)}
			</div>
		</section>
	)
}
