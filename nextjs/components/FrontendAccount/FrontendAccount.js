/* * */

import styles from './FrontendAccount.module.css';
import FrontendSection from '@/components/FrontendSection/FrontendSection';
import FrontendWrapperInner from '@/components/FrontendWrapperInner/FrontendWrapperInner';
import Title from '@/components/Title/Title';

/* * */

export default function FrontendAccount({ children }) {
  return (
    <div className={styles.container}>
      <FrontendWrapperInner>
        <FrontendSection first>
          <Title text="Conta" />
        </FrontendSection>
        <FrontendSection>
          <div className={styles.grid}>{children}</div>
        </FrontendSection>
      </FrontendWrapperInner>
    </div>
  );
}
