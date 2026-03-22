import { useState } from 'react'
import animationRobot from '@/src/assets/animation/authRobot.json'
import Lottie from 'lottie-react'
import { Loader } from '@mantine/core'

export const LottieAnimation = () => {
	const [lottieLoaded, setLottieLoaded] = useState(false)

	const handleLottieLoaded = () => {
		setLottieLoaded(true)
	}

	return (
		<div className='relative flex justify-center items-center w-[180px] h-[180px] max-sm:w-[120px] max-sm:h-[120px] mx-auto'>
			<Lottie
				className='max-w-[180px] h-[180px] max-sm:max-w-[120px] max-sm:h-[120px]'
				animationData={animationRobot}
				loop
				onDOMLoaded={handleLottieLoaded}
			/>
			{!lottieLoaded && (
				<div className='absolute inset-0 flex items-center justify-center'>
					<Loader size='xs' color='red' className='rounded' />
				</div>
			)}
		</div>
	)
}
