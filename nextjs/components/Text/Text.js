/* * */

import styles from './Text.module.css';

/* * */

export default function Text({ variant = 'default', text = '', ...props }) {
  switch (variant) {
    default:
    case 'default':
      return (
        <p className={`${styles.text} ${styles.default}`} {...props}>
          {text}
        </p>
      );
    case 'muted':
      return (
        <p className={`${styles.text} ${styles.muted}`} {...props}>
          {text}
        </p>
      );
    case 'error':
      return (
        <p className={`${styles.text} ${styles.error}`} {...props}>
          {text}
        </p>
      );
  }
}
