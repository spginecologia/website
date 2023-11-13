/* * */

import Link from 'next-intl/link';
import Image from 'next/image';
import styles from './FrontendNewsGridRegular.module.css';
import Text from '@/components/Text/Text';
import FrontendTopicTag from '@/components/FrontendTopicTag/FrontendTopicTag';
import FrontendPublishDate from '@/components/FrontendPublishDate/FrontendPublishDate';

/* * */

export default function FrontendNewsGridRegular({ id, image_url, topics, title, text, publish_date }) {
  return (
    <Link href={`/news/${id}`} className={styles.container}>
      <div className={styles.imageWrapper}>{image_url && <Image src={image_url} fill style={{ objectFit: 'cover' }} />}</div>
      <div className={styles.contentWrapper}>
        <FrontendTopicTag noLink />
        <h3 className={styles.title}>{title}</h3>
        <Text text={text} />
        <FrontendPublishDate />
      </div>
    </Link>
  );
}
