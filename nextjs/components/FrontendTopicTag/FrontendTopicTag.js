'use client';

/* * */

import { Link } from '@/translations/navigation';
import styles from './FrontendTopicTag.module.css';
import Loader from '@/components/Loader/Loader';

/* * */

export default function FrontendTopicTag({ _id, noLink = false }) {
  //

  //
  // A. Setup variables

  const topicData = {
    _id: '398hhify2987b8ebn',
    title: 'Menopausa',
  };

  const topicLoading = false;

  //
  // B. Render components

  if (topicLoading) return <Loader visible />;

  if (noLink) return <div className={styles.tag}>{topicData.title}</div>;

  return (
    <Link href={`/topics/${topicData._id}`} className={styles.link}>
      {topicData.title}
    </Link>
  );

  //
}
