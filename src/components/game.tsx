import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuestions } from '@/store/questions'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { type Question as QType } from '../types.d'
import Footer from './footer'
import { Button } from './ui/button'

const getBGColor = (info: QType, answerIndex: number) => {
  const { userSelection, correctAnswer } = info

  if (userSelection == null) return 'bg-transparent'
  if (answerIndex !== correctAnswer && answerIndex !== userSelection) {
    return 'bg-transparent'
  }
  if (answerIndex === correctAnswer) {
    return 'bg-green-500 hover:bg-green-600 animate-pulse duration-800 transition-colors '
  }
  if (answerIndex === userSelection) {
    return 'bg-red-500 hover:bg-red-600 line-through'
  }

  return 'bg-transparent'
}

const Question = ({ info }: { info: QType }) => {
  const selectAnswer = useQuestions(state => state.selectAnswer)

  const handleClick = (answerIndex: number) => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card className=' md:w-[550px] md:h-[360px] '>
      <CardHeader>
        <CardTitle className='leading-relaxed text-center text-xl font-bold'>
          {info.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='list-disc'>
          {info.answers.map(({ answer, id }, index) => {
            return (
              <li
                onClick={() => handleClick(id)}
                key={index}
                className={`cursor-pointer py-2 font-mono hover:bg-slate-200 rounded-3xl px-4   ${getBGColor(
                  info,
                  id
                )}`}
              >
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
  const questions = useQuestions(state => state.questions)
  const currentQuestion = useQuestions(state => state.currentQuestion)
  const nextQuestion = useQuestions(state => state.nextQuestion)
  const prevQuestion = useQuestions(state => state.prevQuestion)
  console.log(currentQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <Card className='ring-2 ring-blue-500 ring-offset-1 ring-offset-blue-50 shadow-2xl shadow-blue-500/50'>
      <CardHeader className='flex flex-row justify-around items-center '>
        <Button
          className={` bg-blue-500 hover:bg-blue-600 text-white  hover:text-white ${
            currentQuestion === 0 && 'none'
          }`}
          size='icon'
          variant='ghost'
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
        >
          <ArrowLeft className='h-4 w-4' />
        </Button>
        <CardTitle className=' w-40 px-2'>{`Pregunta ${
          currentQuestion + 1
        }`}</CardTitle>
        <Button
          className={`bg-blue-500 hover:bg-blue-600 text-white hover:text-white ${
            currentQuestion === questions.length - 1 && 'none'
          }`}
          size='icon'
          variant='ghost'
          onClick={nextQuestion}
          disabled={currentQuestion === questions.length - 1}
        >
          <ArrowRight className='h-4 w-4' />
        </Button>
      </CardHeader>
      <section className='min-w-full flex justify-center items-center'>
        <Question info={questionInfo} />
      </section>
      <Footer />
    </Card>
  )
}

export default Game
