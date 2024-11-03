import React from 'react'

import { serializeLexical } from '@/payload/lexical/serializeLexical'

import styles from './styles.module.css'
type Props = {
  className?: string
  content: Record<string, any>
}

const RichText: React.FC<Props> = ({
  className,
  content,
}) => {
  if (!content) {
    return null
  }

  const serializedContent = serializeLexical(content as any)

  return (
    <div
      className={`${className} ${styles.prose}`}
    >
      {serializedContent}
    </div>
  )
}

export default RichText