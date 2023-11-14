import { URL } from '@/utils/consts'
export const getAllQuestions = async () => {
  const res = await fetch(`${URL}/data.json`)
  const json = await res.json()
  return json
}
