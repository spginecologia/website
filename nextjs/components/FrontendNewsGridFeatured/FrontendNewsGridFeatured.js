/* * */

import Link from 'next-intl/link';
import styles from './FrontendNewsGridFeatured.module.css';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';

/* * */

export default function FrontendNewsGridFeatured() {
  return (
    <Link href={'/'} className={styles.container}>
      <NoDataLabel text={'Notícias'} />
    </Link>
  );
}
