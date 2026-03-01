import { ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useIntl } from 'react-intl'

export const ThemeSwitcher = () => {
	const intl = useIntl()
	const label = intl.formatMessage({ id: 'toggle_theme' })

	const { theme, setTheme } = useTheme()
	const { setColorScheme } = useMantineColorScheme()
	const isDark = theme === 'dark'

	const handleToggle = () => {
		const next = isDark ? 'light' : 'dark'
		setTheme(next)
		setColorScheme(next)
	}

	return (
		<Tooltip label={label} position='left'>
			<ActionIcon
				onClick={handleToggle}
				variant='light'
				color='gray'
				size='lg'
				aria-label={label}
				style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999 }}
			>
				<span className='theme-switcher-icon-light' aria-hidden>
					<Moon size={20} />
				</span>
				<span className='theme-switcher-icon-dark' aria-hidden>
					<Sun size={20} />
				</span>
			</ActionIcon>
		</Tooltip>
	)
}
