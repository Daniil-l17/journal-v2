import { FC } from 'react'
import { Props } from './typed'
import { Modal } from '@mantine/core'
import Image from 'next/image'

export const ModalLeader: FC<Props> = ({ photoPreview, setPhotoPreview }) => {
	return (
		<Modal
			opened={!!photoPreview}
			onClose={() => setPhotoPreview(null)}
			title={photoPreview?.alt}
			centered
			size='sm'
			padding='md'
			styles={{ title: { fontWeight: 600 } }}
		>
			{photoPreview ? (
				<div className='flex justify-center'>
					<Image
						src={photoPreview.src}
						alt={photoPreview.alt}
						width={400}
						height={400}
						className='h-[400px] w-auto max-w-full object-contain rounded-md'
					/>
				</div>
			) : null}
		</Modal>
	)
}
