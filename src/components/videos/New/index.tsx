import { Media, NewVideoPage } from '@/payload-types'

import styles from './styles.module.css'
import Image from 'next/image'
import Form from './Form'

export function NewVideo({ image }: { image: NewVideoPage }) {
  return (
    <div className={styles.wrapper}>
      <Image
        alt={(image.image as Media)?.alt ?? ''}
        height={511}
        src={(image.image as Media)?.url ?? '/placeholder.png'}
        width={500}
      />
      <Form />
    </div>
  )
}
