import { createContext, use, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
	children: React.ReactNode
	defaultTheme?: Theme
	storageKey?: string
}

type ThemeProviderState = {
	theme: Theme
	setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
	theme: 'system',
	setTheme: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

const isTheme = (value: string): value is Theme => {
	return value === 'light' || value === 'dark' || value === 'system'
}

const getSystemTheme = (): Exclude<Theme, 'system'> => {
	return window.matchMedia('(prefers-color-scheme: dark)').matches ?
			'dark'
		:	'light'
}

const applyThemeToRoot = (theme: Theme): void => {
	const root = window.document.documentElement
	const resolvedTheme = theme === 'system' ? getSystemTheme() : theme

	root.classList.remove('light', 'dark')
	root.classList.add(resolvedTheme)
	root.style.colorScheme = resolvedTheme
}

export function ThemeProvider({
	children,
	defaultTheme = 'system',
	storageKey = 'vite-ui-theme',
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(() => {
		const storedTheme = localStorage.getItem(storageKey)
		if (storedTheme != null && isTheme(storedTheme)) {
			return storedTheme
		}

		return defaultTheme
	})

	useEffect(() => {
		applyThemeToRoot(theme)
	}, [theme])

	useEffect(() => {
		if (theme !== 'system') return

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handleChange = (): void => {
			applyThemeToRoot('system')
		}

		if (typeof mediaQuery.addEventListener === 'function') {
			mediaQuery.addEventListener('change', handleChange)
			return () => mediaQuery.removeEventListener('change', handleChange)
		}

		mediaQuery.addListener(handleChange)
		return () => mediaQuery.removeListener(handleChange)
	}, [theme])

	const value = {
		theme,
		setTheme: (nextTheme: Theme) => {
			localStorage.setItem(storageKey, nextTheme)
			setTheme(nextTheme)
		}
	}

	return (
		<ThemeProviderContext
			{...props}
			value={value}>
			{children}
		</ThemeProviderContext>
	)
}

export const useTheme = () => {
	const context = use(ThemeProviderContext)

	if (context === undefined)
		throw new Error('useTheme must be used within a ThemeProvider')

	return context
}

export type { Theme }
