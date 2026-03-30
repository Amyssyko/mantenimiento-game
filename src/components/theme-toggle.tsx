import { type Theme, useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Laptop2, MoonStar, Sun } from 'lucide-react'
import { type ComponentType } from 'react'

interface ThemeOption {
	value: Theme
	label: string
	icon: ComponentType<{ className?: string }>
}

const themeOptions: ThemeOption[] = [
	{
		value: 'system',
		label: 'Sistema',
		icon: Laptop2
	},
	{
		value: 'light',
		label: 'Claro',
		icon: Sun
	},
	{
		value: 'dark',
		label: 'Oscuro',
		icon: MoonStar
	}
]

const ThemeToggle = () => {
	const { theme, setTheme } = useTheme()

	const handleThemeChange = (newTheme: Theme): void => {
		setTheme(newTheme)
	}

	return (
		<div className='flex flex-wrap justify-center items-center gap-2'>
			{themeOptions.map(({ value, label, icon: Icon }) => {
				const isActive = theme === value

				return (
					<Button
						key={value}
						size='lg'
						type='button'
						variant='outline'
						className={cn(
							'border-2 text-foreground hover:scale-[1.02] transition-transform',
							isActive &&
								'bg-primary/90 text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground'
						)}
						onClick={() => {
							handleThemeChange(value)
						}}
						aria-pressed={isActive}
						title={`Cambiar tema a ${label.toLowerCase()}`}>
						<Icon className='w-4 h-4' />
						{label}
					</Button>
				)
			})}
		</div>
	)
}

export default ThemeToggle
