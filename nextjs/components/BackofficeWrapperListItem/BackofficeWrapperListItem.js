/* * */

import styles from './BackofficeWrapperListItem.module.css';
import { IconChevronRight } from '@tabler/icons-react';

/* * */

export default function BackofficeWrapperListItem({ children, onClick, isSelected, withChevron }) {
  return (
    <div className={`${styles.container} ${isSelected && styles.isSelected}`} onClick={onClick}>
      <div className={styles.wrapper}>{children}</div>
      {withChevron && <IconChevronRight className={styles.chevron} />}
    </div>
  );
}
