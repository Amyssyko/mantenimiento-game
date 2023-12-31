import { useQuestionData } from '@/hooks/useQuestionData'
import { useSEO } from '@/hooks/useSEO'
import { useQuestions } from '@/store/questions'
import { CheckCircle, CircleDashed, RotateCcw, XCircle } from 'lucide-react'
import { Button } from './ui/button'
import { CardFooter } from './ui/card'
import { Progress } from './ui/progress'

const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionData()
  const handleReset = useQuestions(state => state.reset)

  useSEO({
    title: `${
      unanswered === 0 ? '' : correct
    } Correctas | ${incorrect} Incorrectas | ${unanswered} Sin Responder`,
    description: 'Agregar y eliminar elementos en la lista.'
  })

  return (
    <CardFooter className='flex flex-col justify-center items-center'>
      <Progress
        className='bg-orange-50 border border-slate-300 placeholder-green-500 my-2'
        value={Number(correct + incorrect) * 10}
      />

      <p className='md:flex gap-4 py-8  '>
        <span className='flex items-center  gap-x-2'>
          <CheckCircle className='text-green-500 w-4 h-4' />
          {correct} correctas
        </span>
        <span className='flex items-center  gap-x-2'>
          <XCircle className='text-red-500 w-4 h-4' /> {incorrect} incorrectas
        </span>
        <span className='flex items-center gap-x-2 '>
          <CircleDashed className='text-gray-500 animate-spin duration-1000 w-4 h-4' />{' '}
          {unanswered} Sin Responder
        </span>
      </p>

      <Button
        onClick={() => {
          window.location.reload()
          return handleReset()
        }}
        variant='destructive'
      >
        <RotateCcw className='h-4 w-4' /> Reiniciar
      </Button>
    </CardFooter>
  )
}

export default Footer
