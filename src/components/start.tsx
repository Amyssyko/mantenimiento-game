import { Button } from '@/components/ui/button'
import { preloadAllQuestions } from '@/services/fetch-question'
import { useQuestions } from '@/store/questions'
import { MAX_QUESTIONS } from '@/utils/consts'
import { Gamepad } from 'lucide-react'

const Start = () => {
	const fetchQuestions = useQuestions((state) => state.fetchQuestions)
	const isFetchingQuestions = useQuestions((state) => state.isFetchingQuestions)

	const warmUpGame = () => {
		void preloadAllQuestions()
		void import('./game')
	}

	const handleClick = async () => {
		warmUpGame()
		await fetchQuestions(MAX_QUESTIONS)
	}
	return (
		<Button
			className='bg-primary/70 hover:bg-primary/80 rounded-full w-full max-w-70 sm:max-w-80 h-11 sm:h-12 font-semibold text-primary-foreground hover:text-primary-foreground text-sm sm:text-base md:text-lg'
			onClick={handleClick}
			onMouseEnter={warmUpGame}
			onFocus={warmUpGame}
			disabled={isFetchingQuestions}
			variant='default'>
			<Gamepad className='w-4 sm:w-5 h-4 sm:h-5' />
			{isFetchingQuestions ? 'Cargando…' : '¡Iniciar juego!'}
		</Button>
	)
}

export default Start
