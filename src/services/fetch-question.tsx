import { type Question } from '@/types.d'

let questionsCache: Question[] | null = null
let pendingQuestionsRequest: Promise<Question[]> | null = null

const loadQuestions = async (): Promise<Question[]> => {
	if (questionsCache != null) {
		return questionsCache
	}

	if (pendingQuestionsRequest != null) {
		return pendingQuestionsRequest
	}

	pendingQuestionsRequest = fetch('/data.json', { cache: 'force-cache' })
		.then(async (res) => {
			if (!res.ok) {
				throw new Error('No se pudieron cargar las preguntas')
			}

			const json = (await res.json()) as Question[]
			questionsCache = json
			return json
		})
		.finally(() => {
			pendingQuestionsRequest = null
		})

	return pendingQuestionsRequest
}

export const preloadAllQuestions = async (): Promise<Question[]> => {
	return await loadQuestions()
}

export const getAllQuestions = async (): Promise<Question[]> => {
	return await loadQuestions()
}
