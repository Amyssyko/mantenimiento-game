import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuestions } from '@/store/questions'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { type Question as QType } from '../types.d'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

const Footer = lazy(async () => await import('./footer'))

const getBGColor = (info: QType, answerIndex: number) => {
	const { userSelection, correctAnswer } = info

	if (userSelection == null) return 'bg-transparent'
	if (answerIndex !== correctAnswer && answerIndex !== userSelection) {
		return 'bg-transparent'
	}
	if (answerIndex === correctAnswer) {
		return 'bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-emerald-950 ring-1 ring-emerald-900/20 dark:ring-emerald-200/20 animate-bounce duration-900 transition-colors'
	}
	if (answerIndex === userSelection) {
		return 'bg-rose-700 text-rose-50 hover:bg-rose-800 dark:bg-rose-700 dark:hover:bg-rose-600 dark:text-rose-50 ring-1 ring-rose-900/20 dark:ring-rose-300/30 line-through'
	}

	return 'bg-transparent'
}

const Question = ({ info }: { info: QType }) => {
	const selectAnswer = useQuestions((state) => state.selectAnswer)

	const handleClick = (answerIndex: number) => {
		selectAnswer(info.id, answerIndex)
	}

	return (
		<Card className='ring-0 w-full max-w-xl md:max-w-2xl md:min-h-max'>
			<CardHeader>
				<CardTitle className='first:mt-0 pb-2 font-semibold text-lg sm:text-xl md:text-2xl text-center tracking-tight'>
					{info.question}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className='flex flex-col gap-3 sm:gap-5 md:gap-6 py-2'>
					{info.answers.map(({ answer, id }, index) => {
						return (
							<li
								onClick={() => handleClick(id)}
								key={index}
								className={`cursor-pointer rounded-2xl px-3 py-2 font-mono transition-colors hover:bg-accent hover:text-accent-foreground sm:px-4 ${getBGColor(
									info,
									id
								)}`}>
								{`${id} – ${answer}`}
							</li>
						)
					})}
				</ul>
			</CardContent>
		</Card>
	)
}

const Game = () => {
	const questions = useQuestions((state) => state.questions)
	const currentQuestion = useQuestions((state) => state.currentQuestion)
	const nextQuestion = useQuestions((state) => state.nextQuestion)
	const prevQuestion = useQuestions((state) => state.prevQuestion)

	const questionInfo = questions[currentQuestion]

	return (
		<Card className='shadow-primary/15 shadow-xl mx-auto ring-2 ring-primary/35 ring-offset-2 ring-offset-background w-full max-w-4xl'>
			<CardHeader className='flex flex-row justify-between items-center gap-2 sm:gap-4'>
				<Button
					type='button'
					aria-label='anterior'
					className={`text-foreground ${currentQuestion === 0 && 'none'}`}
					size='icon-sm'
					variant='secondary'
					onClick={prevQuestion}
					disabled={currentQuestion === 0}>
					<ArrowLeft className='w-4 h-4' />
				</Button>
				<CardTitle className='px-2 w-auto min-w-36 sm:min-w-40 font-semibold text-base sm:text-lg md:text-xl text-center tracking-tight scroll-m-20'>{`Pregunta ${
					currentQuestion + 1
				}`}</CardTitle>
				<Button
					type='button'
					aria-label='siguiente'
					className={`text-foreground ${
						currentQuestion === questions.length - 1 && 'none'
					}`}
					size='icon-sm'
					variant='secondary'
					onClick={nextQuestion}
					disabled={currentQuestion === questions.length - 1}>
					<ArrowRight className='w-4 h-4' />
				</Button>
			</CardHeader>
			<section className='flex justify-center items-center px-2 sm:px-4 pb-2 min-w-full'>
				<Question info={questionInfo} />
			</section>
			<Suspense
				fallback={
					<div
						className='px-4 sm:px-6 pt-5 pb-6 w-full'
						aria-hidden='true'>
						<Skeleton className='mb-4 rounded-full w-full h-2' />
						<div className='flex sm:flex-row flex-col gap-2'>
							<Skeleton className='rounded-md w-full sm:w-40 h-4' />
							<Skeleton className='rounded-md w-full sm:w-40 h-4' />
							<Skeleton className='rounded-md w-full sm:w-40 h-4' />
						</div>
					</div>
				}>
				<Footer />
			</Suspense>
		</Card>
	)
}

export default Game
