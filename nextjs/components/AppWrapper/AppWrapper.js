import AppFooter from '../AppFooter/AppFooter';
import styles from './AppWrapper.module.css';
import AppHeader from '@/components/AppHeader/AppHeader';

export default function AppWrapper({ children }) {
  return (
    <div className={styles.container}>
      <AppHeader />
      {children}
      <AppFooter />
    </div>
  );
}
