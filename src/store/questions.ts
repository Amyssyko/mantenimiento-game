import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { getAllQuestions } from '@/services/fetch-question'
import { type Question } from '../types.d'

const createShuffledSubset = (
	source: Question[],
	limit: number
): Question[] => {
	const pool = [...source]
	for (let i = pool.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1))
		;[pool[i], pool[randomIndex]] = [pool[randomIndex], pool[i]]
	}

	return pool.slice(0, Math.min(limit, pool.length))
}

interface State {
	questions: Question[]
	currentQuestion: number
	correctCount: number
	incorrectCount: number
	unansweredCount: number
	isFetchingQuestions: boolean
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
				correctCount: 0,
				incorrectCount: 0,
				unansweredCount: 0,
				isFetchingQuestions: false,
				fetchQuestions: async (limit: number) => {
					set({ isFetchingQuestions: true })
					try {
						const data = await getAllQuestions()
						const questions = createShuffledSubset(data, limit)
						set({
							questions,
							currentQuestion: 0,
							correctCount: 0,
							incorrectCount: 0,
							unansweredCount: questions.length,
							isFetchingQuestions: false
						})
					} catch (error) {
						set({ isFetchingQuestions: false })
						throw error
					}
				},
				selectAnswer: (questionId: number, answerId: number) => {
					const { questions, correctCount, incorrectCount, unansweredCount } =
						get()
					const newQuestions = [...questions]
					const questionIndex = newQuestions.findIndex(
						(question) => question.id === questionId
					)
					if (questionIndex < 0) return

					const questionInfo = newQuestions[questionIndex]
					const isCorrect = questionInfo.correctAnswer === answerId
					const hadPreviousSelection = questionInfo.userSelection != null
					const wasCorrectBefore =
						hadPreviousSelection &&
						questionInfo.userSelection === questionInfo.correctAnswer

					let nextCorrectCount = correctCount
					let nextIncorrectCount = incorrectCount
					let nextUnansweredCount = unansweredCount

					if (!hadPreviousSelection) {
						nextUnansweredCount -= 1
					} else if (wasCorrectBefore) {
						nextCorrectCount -= 1
					} else {
						nextIncorrectCount -= 1
					}

					if (isCorrect) {
						nextCorrectCount += 1
					} else {
						nextIncorrectCount += 1
					}

					if (isCorrect) {
						void import('canvas-confetti').then(({ default: confetti }) => {
							confetti()
						})
					}

					newQuestions[questionIndex] = {
						...questionInfo,
						isCorrect,
						userSelection: answerId
					}

					set({
						questions: newQuestions,
						correctCount: nextCorrectCount,
						incorrectCount: nextIncorrectCount,
						unansweredCount: nextUnansweredCount
					})
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
						correctCount: 0,
						incorrectCount: 0,
						unansweredCount: 0,
						isFetchingQuestions: false
					})
				}
			}
		},
		{
			name: 'questions-store'
		}
	)
)
