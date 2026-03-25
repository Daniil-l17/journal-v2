'use client'

import { FC, useLayoutEffect, useState } from 'react'
import { Props } from './typed'
import { Modal } from '@mantine/core'
import Image from 'next/image'

export const ModalLeader: FC<Props> = ({ photoPreview, setPhotoPreview }) => {
	const [opened, setOpened] = useState(false)

	useLayoutEffect(() => {
		setOpened(!!photoPreview)
	}, [photoPreview])

	return (
		<Modal
			opened={opened}
			onClose={() => setOpened(false)}
			title={photoPreview?.alt}
			centered
			size='sm'
			padding='md'
			styles={{ title: { fontWeight: 600 } }}
			transitionProps={{
				transition: 'slide-up',
				duration: 150,
				timingFunction: 'ease-in-out',
				onExited: () => setPhotoPreview(null)
			}}
		>
			{photoPreview ? (
				<div className='flex justify-center'>
					<Image
						src={photoPreview.src}
						alt={photoPreview.alt}
						width={400}
						height={400}
						className='h-[400px] w-auto max-w-full rounded-md object-contain'
					/>
				</div>
			) : null}
		</Modal>
	)
}
