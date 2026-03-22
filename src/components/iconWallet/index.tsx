import type { FC } from 'react'
import Image from 'next/image'
import { Props } from './typed'

const basePath = '/wallet'

export const IconWallet: FC<Props> = ({ type, size }) => {
	const box = { width: size, height: size } as const

	return <Image src={`${basePath}/${type}.png`} alt='wallet' width={size} height={size} className='object-contain' style={box} />
}
