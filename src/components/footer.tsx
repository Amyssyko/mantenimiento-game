import { useSEO } from '@/hooks/useSEO'
import { useQuestions } from '@/store/questions'
import { CheckCircle, CircleDashed, RotateCcw, XCircle } from 'lucide-react'
import { Button } from './ui/button'
import { CardFooter } from './ui/card'

const Footer = () => {
	const questions = useQuestions((state) => state.questions)
	const correct = useQuestions((state) => state.correctCount)
	const incorrect = useQuestions((state) => state.incorrectCount)
	const unanswered = useQuestions((state) => state.unansweredCount)
	const handleReset = useQuestions((state) => state.reset)
	const total = correct + incorrect + unanswered
	const answeredPercentage =
		total > 0 ? ((correct + incorrect) / total) * 100 : 0

	useSEO({
		title: `${
			unanswered === 0 ? '' : correct
		} Correctas | ${incorrect} Incorrectas | ${unanswered} Sin Responder`,
		description: 'Agregar y eliminar elementos en la lista.'
	})

	return (
		<CardFooter className='flex flex-col justify-center items-center'>
			<div
				role='progressbar'
				aria-label='Progreso de respuestas'
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={Math.round(answeredPercentage)}
				aria-valuetext={`${correct} correctas, ${incorrect} incorrectas, ${unanswered} sin responder`}
				className='bg-muted my-2 p-0.5 border border-border rounded-full w-full h-3 overflow-hidden'>
				<div className='flex gap-0.5 w-full h-full'>
					{questions.map((question, index) => {
						const isAnswered = question.userSelection != null
						const statusClass =
							!isAnswered ? 'bg-muted-foreground/30'
							: question.isCorrect ? 'bg-emerald-700 dark:bg-emerald-500'
							: 'bg-rose-700 dark:bg-rose-600'

						return (
							<span
								key={question.id}
								title={`Pregunta ${index + 1}: ${
									!isAnswered ? 'sin responder'
									: question.isCorrect ? 'correcta'
									: 'incorrecta'
								}`}
								className={`${statusClass} first:rounded-l-full last:rounded-r-full flex-1 transition-colors duration-300`}
							/>
						)
					})}
				</div>
			</div>

			<p className='flex sm:flex-row flex-col items-start sm:items-center gap-2 sm:gap-4 py-6 md:py-8 text-foreground text-sm sm:text-base'>
				<span className='flex items-center gap-x-2'>
					<CheckCircle className='w-4 h-4 text-primary' />
					{correct} correctas
				</span>
				<span className='flex items-center gap-x-2'>
					<XCircle className='w-4 h-4 text-destructive' /> {incorrect}{' '}
					incorrectas
				</span>
				<span className='flex items-center gap-x-2'>
					<CircleDashed className='w-4 h-4 text-muted-foreground animate-spin duration-1000' />{' '}
					{unanswered} Sin Responder
				</span>
			</p>

			<Button
				className='bg-primary/70 hover:bg-primary/80 border-primary text-primary-foreground'
				onClick={() => {
					handleReset()
				}}
				variant='destructive'>
				<RotateCcw className='w-4 h-4' /> Reiniciar
			</Button>
		</CardFooter>
	)
}

export default Footer
