'use client'

import type { FC } from 'react'
import { Phone } from 'lucide-react'
import type { Props } from './typed'

const toDigits = (value: string) => value.replace(/\D/g, '')

const formatPhoneRu = (raw: string) => {
	const digits = toDigits(raw)
	const d10 =
		digits.length === 11
			? digits[0] === '8' || digits[0] === '7'
				? digits.slice(1)
				: digits.slice(1)
			: digits.length === 10
				? digits
				: null

	if (!d10 || d10.length !== 10) {
		const cleaned = raw.trim()
		return { href: cleaned ? `tel:${cleaned}` : '#', label: raw }
	}

	const a = d10.slice(0, 3)
	const b = d10.slice(3, 6)
	const c = d10.slice(6, 8)
	const e = d10.slice(8, 10)

	return {
		href: `tel:+7${d10}`,
		label: `+7 (${a}) ${b}-${c}-${e}`
	}
}

export const Phones: FC<Props> = ({ phones }) => {
	if (!phones?.length) return null

	return (
		<div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
			{phones.map((raw, i) => {
				const { href, label } = formatPhoneRu(raw)
				const last = i === phones.length - 1
				return (
					<span key={`${raw}-${i}`} className='inline-flex items-center'>
						<a href={href} className='inline-flex max-w-full items-center gap-2 text-base font-medium text-gray-900 hover:underline'>
							<Phone size={16} className='text-primary' />
							<span className='tabular-nums'>{label}</span>
						</a>
					</span>
				)
			})}
		</div>
	)
}
