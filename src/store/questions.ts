import confetti from 'canvas-confetti'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { getAllQuestions } from '@/services/fetch-question'
import { type Question } from '../types.d'
interface Pregunta {
  id: number
  title: string
  description: string
  url: string
}
interface State {
  questions: Question[]
  currentQuestion: number
  data: any
  selectData: (data: Pregunta[]) => void
  fetchQuestions: (limit: number, url: string) => Promise<void>
  selectAnswer: (questionId: number, answerId: number) => void
  nextQuestion: () => void
  prevQuestion: () => void
  reset: () => void
}

export const useQuestions = create<State>()(
  persist(
    (set, get) => {
      return {
        data: '',
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number, url: string) => {
          const data = await getAllQuestions(url)
          const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)
          set({ questions })
        },
        selectData: (data: Pregunta[]) => {
          const singlePregunta = data
            .sort(() => Math.random() - 0.5)
            .slice(0, 1)
          set({ data: singlePregunta[0] })
        },
        selectAnswer: (questionId: number, answerId: number) => {
          const { questions } = get()
          const newQuestions = structuredClone(questions)
          const questionIndex = newQuestions.findIndex(
            question => question.id === questionId
          )
          const questionInfo = newQuestions[questionIndex]
          const isCorrect = questionInfo.correctAnswer === answerId
          if (isCorrect) confetti()

          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrect,
            userSelection: answerId
          }

          set({ questions: newQuestions })
        },

        nextQuestion: () => {
          const { questions, currentQuestion } = get()
          const nextQuestion = currentQuestion + 1
          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion })
          }
        },
        prevQuestion: () => {
          const { currentQuestion } = get()
          const prevQuestion = currentQuestion - 1
          if (prevQuestion >= 0) {
            set({ currentQuestion: prevQuestion })
          }
        },
        reset: () => {
          set({
            currentQuestion: 0,
            questions: [],
            data: ''
          })
        }
      }
    },
    {
      name: 'questions-store'
    }
  )
)
