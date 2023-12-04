import { useQuestions } from '@/store/questions'
import { Laptop2 } from 'lucide-react'
import Game from './components/game'
import Start from './components/start'

interface Pregunta {
  id: number
  title: string
  description: string
  url: string
}

const preguntas = [
  {
    id: 1,
    title:
      'Juego de Preguntas de Ofimática, y Mantenimiento de Computadora y Laptop',
    description:
      'Las preguntas son referentes a la ofimática y mantenimiento de computadora y laptop, podrás evaluar tus conocimientos sobre el tema. Ademas de poder aprender mas sobre la ofimática y mantenimiento de computadora y laptop.',
    url: 'http://localhost:5173/data.json'
  },
  {
    id: 2,
    title:
      'Juego de Preguntas de Ofimática, y Mantenimiento de Computadora y Laptop',
    description:
      'Las preguntas son referentes a la ofimática y mantenimiento de computadora y laptop, podrás evaluar tus conocimientos sobre el tema. Ademas de poder aprender mas sobre la ofimática y mantenimiento de computadora y laptop.',
    url: 'http://localhost:5173/data1.json'
  },
  {
    id: 3,
    title:
      'Juego de Preguntas de Ofimática, y Mantenimiento de Computadora y Laptop',
    description:
      'Las preguntas son referentes a la ofimática y mantenimiento de computadora y laptop, podrás evaluar tus conocimientos sobre el tema. Ademas de poder aprender mas sobre la ofimática y mantenimiento de computadora y laptop.',
    url: 'http://localhost:5173/data2.json'
  }
] as Pregunta[]

const App = () => {
  const questions = useQuestions(state => state.questions)

  const setData = useQuestions(state => state.selectData)
  setData(preguntas)
  const data = useQuestions(state => state.data)
  return (
    <section className='flex flex-col justify-center items-center py-4 w-full min-h-screen max-h-full px-[10px] sm:px-[100px] md:px-[200px]'>
      <article className='pb-12'>
        <h1 className=' flex tracking-tight justify-center items-center text-sky-800 font-semibold md:text-3xl text-center'>
          <Laptop2 className='h-14 w-14 md:w-8 md:h-8 mr-2 animate-pulse ' />
          {data.title}
        </h1>
        <p className='text-2xl leading-7 [&:not(:first-child)]:mt-6 pt-2'>
          {data.description}
        </p>
      </article>
      <article className='w-full h-full flex justify-center items-center'>
        {questions.length === 0 && <Start url={data.url} />}
        {questions.length > 0 && <Game />}
      </article>
    </section>
  )
}

export { App }
