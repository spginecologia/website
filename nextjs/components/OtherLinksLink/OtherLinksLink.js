'use client';

/* * */

import Link from 'next/link';
import styles from './OtherLinksLink.module.css';

/* * */

export default function OtherLinksLink({ linkData }) {
  return (
    <Link className={`${styles.container} ${linkData.is_featured && styles.isFeatured}`} href={linkData.href} target="_blank">
      <p className={styles.title}>{linkData.title}</p>
      {linkData.subtitle && <p className={styles.subtitle}>{linkData.subtitle}</p>}
    </Link>
  );
}
