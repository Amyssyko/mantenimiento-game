import { useQuestions } from '@/store/questions'

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
