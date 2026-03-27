/*import { useIntl } from 'react-intl'*/
import Image from 'next/image'
import { LottieAnimation } from './lottieAnimation'
import { Languages } from './languages'
import { LoginForm } from './loginForm'

export const Login = () => {
	/*	const intl = useIntl()
	 */
	return (
		<div className='flex'>
			<div className='relative w-1/2 overflow-hidden max-lg:hidden'>
				<Image draggable={false} src='/first_screen.jpg' alt='' fill className='object-cover' priority />
				<div className='pointer-events-none absolute inset-0 bg-linear-to-tr from-black/40 via-black/20 to-transparent' />
			</div>

			<div className='flex w-1/2 justify-center py-12 max-lg:w-full px-2 h-screen overflow-y-auto'>
				<div className='w-full max-w-[800px] px-2'>
					<div className='mb-6 flex justify-center'>
						<LottieAnimation />
					</div>

					<div className='mb-6 text-center'>
						<h1 className='text-[40px] font-bold leading-tight wrap-break-word max-sm:text-3xl'>
							{/*{intl.formatMessage({ id: 'login_title' })}*/}Электронный журнал нового поколения
							<span className='text-accent'>
								{
									/* intl.formatMessage({ id: 'login_title_accent' }) */
									'для студентов IT TOP'
								}
							</span>
						</h1>
						<p className='mt-3 text-sm text-site-text-secondary'>
							{
								/* intl.formatMessage({ id: 'login_description' }) */
								'Платформа, которая упрощает учебный процесс. Отслеживайте расписание, оценки и домашние задания в удобном формате — все необходимые инструменты собраны в приятном интерфейсе.'
							}
						</p>
					</div>

					<LoginForm />
					<Languages />
				</div>
			</div>
		</div>
	)
}
