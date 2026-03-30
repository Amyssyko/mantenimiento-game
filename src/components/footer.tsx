import { useSEO } from '@/hooks/useSEO'
import { useQuestions } from '@/store/questions'
import { CheckCircle, CircleDashed, RotateCcw, XCircle } from 'lucide-react'
import { Button } from './ui/button'
import { CardFooter } from './ui/card'
import { Progress } from './ui/progress'

const Footer = () => {
	const correct = useQuestions((state) => state.correctCount)
	const incorrect = useQuestions((state) => state.incorrectCount)
	const unanswered = useQuestions((state) => state.unansweredCount)
	const handleReset = useQuestions((state) => state.reset)

	useSEO({
		title: `${
			unanswered === 0 ? '' : correct
		} Correctas | ${incorrect} Incorrectas | ${unanswered} Sin Responder`,
		description: 'Agregar y eliminar elementos en la lista.'
	})

	return (
		<CardFooter className='flex flex-col justify-center items-center'>
			<Progress
				aria-label='progress'
				className='bg-muted my-2 border border-border'
				value={Number(correct + incorrect) * 10}
			/>

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
