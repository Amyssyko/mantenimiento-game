import { Button } from '@/components/ui/button'
import { useQuestions } from '@/store/questions'
import { MAX_QUESTIONS } from '@/utils/consts'
import { Gamepad } from 'lucide-react'

const Start = ({ url }: { url: string }) => {
  const fetchQuestions = useQuestions(state => state.fetchQuestions)
  const handleClick = () => {
    fetchQuestions(MAX_QUESTIONS, url)
  }
  return (
    <Button
      className='hover:bg-blue-600 hover:text-white bg-blue-700 shadow-lg shadow-slate-950  text-white font-semibold md:text-xl p-4 rounded-full w-[150px] md:w-[200px]'
      onClick={handleClick}
      variant='ghost'
    >
      <Gamepad className='md:w-8 md:h-8' />
      ¡Iniciar juego!
    </Button>
  )
}

export default Start
