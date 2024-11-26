/* * */

import styles from './FrontendWrapper.module.css';
import FrontendHeader from '@/components/FrontendHeader/FrontendHeader';
import FrontendFooter from '@/components/FrontendFooter/FrontendFooter';

/* * */

export default function FrontendWrapper({ children }) {
  return (
    <div className={styles.container}>
      <FrontendHeader />
      {children}
      <FrontendFooter />
    </div>
  );
}
