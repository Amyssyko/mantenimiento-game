import React, { useEffect } from 'react'

interface Props {
  title: string
  description: string
}
export const useSEO: React.FC<Props> = ({ title, description }) => {
  useEffect(() => {
    document.title = title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description)
  }, [title, description])

  return <div>useSEO</div>
}
