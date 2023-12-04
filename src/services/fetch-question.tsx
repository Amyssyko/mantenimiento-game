export const getAllQuestions = async (url: string) => {
  // const res = await fetch(`${URL}/data.json`)
  const res = await fetch(url)

  const json = await res.json()
  return json
}
