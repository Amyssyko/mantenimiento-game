import { useQuestions } from '@/store/questions'
import confetti from 'canvas-confetti'

const duration = 15 * 1000
const animationEnd = Date.now() + duration
const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

function randomInRange(min: any, max: any) {
  return Math.random() * (max - min) + min
}
export const congratulate = () => {
  return setTimeout(() => {
    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)
  }, 2000)
}

export const useQuestionData = () => {
  const questions = useQuestions(state => state.questions)
  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach(question => {
    const { userSelection, correctAnswer } = question
    if (userSelection == null) unanswered++
    else if (userSelection === correctAnswer) correct++
    else incorrect++
  })

  return { correct, incorrect, unanswered }
}
