/* * */

import styles from './BackofficeWrapperList.module.css';
import Loader from '@/components/Loader/Loader';
import SearchField from '@/components/SearchField/SearchField';
import BackofficeWrapperButtonCreate from '@/components/BackofficeWrapperButtonCreate/BackofficeWrapperButtonCreate';

/* * */

export default function BackofficeWrapperList({ isLoading, searchQuery, onChangeSearchQuery, isCreating, onCreate, children }) {
  return (
    <div className={styles.container}>
      {isLoading && <Loader visible full />}
      <div className={styles.header}>
        <SearchField query={searchQuery} onChange={onChangeSearchQuery} />
        <BackofficeWrapperButtonCreate isLoading={isCreating} onClick={onCreate} />
      </div>
      <div className={styles.items}>{children}</div>
    </div>
  );
}
