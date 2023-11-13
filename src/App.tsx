import Start from '@/components/start'
import { useQuestions } from '@/store/questions'
import { Laptop2 } from 'lucide-react'
import Game from './components/game'

function App() {
  const questions = useQuestions(state => state.questions)

  return (
    <section className='flex flex-col justify-center items-center py-4 w-full min-h-screen max-h-full px-[10px] sm:px-[100px] md:px-[200px]'>
      <article className='pb-12'>
        <h1 className=' flex  justify-center items-center text-sky-800 font-semibold md:text-3xl text-center'>
          <Laptop2 className='h-14 w-14 md:w-8 md:h-8 mr-2 animate-pulse ' />
          Juego de Preguntas Mantenimiento de Computadora
        </h1>
        <p className='text-2xl  text-start tracking-tight pt-2'>
          Todas las preguntas sobre el mantenimiento de la computadora y laptop,
          podras evaluar tus conocimientos sobre el tema. Ademas de poder
          aprender mas sobre el mantenimiento de la computadora y laptop.
        </p>
      </article>
      <article className='w-full h-full flex justify-center items-center'>
        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </article>
    </section>
  )
}

export default App
