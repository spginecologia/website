/* * */

import Text from '../Text/Text';
import styles from './FrontendAccountProfileEditSection.module.css';

/* * */

export default function FrontendAccountProfileEditSection({ title, description, children }) {
  return (
    <div className={styles.container}>
      {title && (
        <div className={styles.formHeader}>
          <Text variant="form_section_title" text={title} />
          {description && <Text variant="form_section_description" text={description} />}
        </div>
      )}
      <div className={styles.children}>{children}</div>
    </div>
  );
}
