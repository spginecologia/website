/* * */

import styles from './BackofficeWrapperListItem.module.css';
import { IconChevronRight } from '@tabler/icons-react';

/* * */

export default function BackofficeWrapperListItem({ title, subtitle, onClick, isSelected }) {
  return (
    <div className={`${styles.container} ${isSelected && styles.isSelected}`} onClick={onClick}>
      <div className={styles.wrapper}>
        <p className={styles.title}>{title}</p>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      <div className={styles.chevron}>
        <IconChevronRight size={18} />
      </div>
    </div>
  );
}
