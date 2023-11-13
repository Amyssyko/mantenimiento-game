export interface Question {
  id: number
  question: string
  answers: Answer[]
  correctAnswer: number
  userSelection?: number
  isCorrect?: boolean
}

export interface Answer {
  id: number
  answer: string
  correct: boolean
}
