/* * */

import { useState } from 'react';
import { IconCaretLeftFilled } from '@tabler/icons-react';
import styles from './BackofficeWrapperPageSection.module.css';

/* * */

export default function BackofficeWrapperPageSection({ defaultOpen = false, title, subtitle, children }) {
  //

  //
  // A. Setup variables

  const [isOpen, setIsOpen] = useState(defaultOpen);

  //
  // B. Handle actions

  const handleToggleSection = () => {
    setIsOpen((prev) => !prev);
  };

  //
  // C. Render components

  return (
    <div className={`${styles.container} ${isOpen && styles.isOpen}`}>
      <div className={styles.header} onClick={handleToggleSection}>
        <div className={styles.headerTitles}>
          <h3 className={styles.title}>{title || 'Untitled Section'}</h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <div className={styles.headerIcon}>
          <IconCaretLeftFilled size={18} />
        </div>
      </div>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );

  //
}
