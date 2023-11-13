import confetti from 'canvas-confetti'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type Question } from '../types.d'
interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerId: number) => void
  nextQuestion: () => void
  prevQuestion: () => void
  reset: () => void
}

export const useQuestions = create<State>()(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
          const res = await fetch('http://localhost:5173/data.json', {
            method: 'GET'
          })
          const data = await res.json()
          const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)
          set({ questions })
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
          set({ currentQuestion: 0, questions: [] })
        }
      }
    },
    {
      name: 'questions-store'
    }
  )
)
