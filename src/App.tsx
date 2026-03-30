import Start from '@/components/start'
import { Skeleton } from '@/components/ui/skeleton'
import { preloadAllQuestions } from '@/services/fetch-question'
import { useQuestions } from '@/store/questions'
import { Laptop2 } from 'lucide-react'
import { lazy, Suspense, useEffect } from 'react'

const Game = lazy(async () => await import('./components/game'))
const ThemeToggle = lazy(async () => await import('@/components/theme-toggle'))

const ThemeToggleSkeleton = () => {
	return (
		<div
			className='flex flex-wrap justify-center items-center gap-2'
			aria-hidden='true'>
			<Skeleton className='rounded-md w-24 h-9' />
			<Skeleton className='rounded-md w-20 h-9' />
			<Skeleton className='rounded-md w-24 h-9' />
		</div>
	)
}

const GameSkeleton = () => {
	return (
		<div
			className='bg-card shadow-primary/10 shadow-xl mx-auto p-4 sm:p-6 border ring-border/60 border-border rounded-xl ring-1 w-full max-w-4xl'
			aria-hidden='true'>
			<div className='flex justify-between items-center gap-4 mb-4'>
				<Skeleton className='rounded-md w-9 h-9' />
				<Skeleton className='rounded-md w-44 h-6' />
				<Skeleton className='rounded-md w-9 h-9' />
			</div>

			<div className='space-y-4 bg-background/70 p-4 border border-border rounded-xl'>
				<Skeleton className='w-11/12 h-6' />
				<Skeleton className='w-full h-12' />
				<Skeleton className='w-full h-12' />
				<Skeleton className='w-full h-12' />
				<Skeleton className='w-full h-12' />
			</div>

			<div className='flex sm:flex-row flex-col items-center gap-3 mt-6'>
				<Skeleton className='rounded-full w-full sm:w-36 h-4' />
				<Skeleton className='rounded-full w-full sm:w-36 h-4' />
				<Skeleton className='rounded-full w-full sm:w-36 h-4' />
			</div>
		</div>
	)
}

function App() {
	const questions = useQuestions((state) => state.questions)

	useEffect(() => {
		const warmUp = () => {
			void preloadAllQuestions()
			void import('./components/game')
		}

		if (typeof window.requestIdleCallback === 'function') {
			const id = window.requestIdleCallback(warmUp, { timeout: 800 })
			return () => window.cancelIdleCallback(id)
		}

		const timeoutId = window.setTimeout(warmUp, 0)
		return () => window.clearTimeout(timeoutId)
	}, [])

	return (
		<section className='flex flex-col justify-center items-center mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-6 w-full max-w-6xl min-h-screen'>
			<article className='pb-8 sm:pb-10 md:pb-12 w-full max-w-4xl'>
				<header className='space-y-3 sm:space-y-4'>
					<div className='flex justify-center sm:justify-end mb-2'>
						<Suspense fallback={<ThemeToggleSkeleton />}>
							<ThemeToggle />
						</Suspense>
					</div>
					<h1 className='flex flex-wrap justify-center items-center gap-2 font-semibold text-foreground text-xl sm:text-2xl md:text-3xl text-center tracking-tight'>
						<Laptop2 className='w-9 sm:w-10 md:w-8 h-9 sm:h-10 md:h-8' />
						Juego de Preguntas Mantenimiento de Computadora
					</h1>
					<p className='pt-1 text-foreground text-base sm:text-lg md:text-xl sm:text-left text-center leading-relaxed'>
						Todas las preguntas sobre el mantenimiento de la computadora y
						laptop, podras evaluar tus conocimientos sobre el tema. Ademas de
						poder aprender mas sobre el mantenimiento de la computadora y
						laptop.
					</p>
				</header>
			</article>
			<article className='flex justify-center items-center w-full h-full'>
				{questions.length === 0 && <Start />}
				{questions.length > 0 && (
					<Suspense fallback={<GameSkeleton />}>
						<Game />
					</Suspense>
				)}
			</article>
		</section>
	)
}

export default App
