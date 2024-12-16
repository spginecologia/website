/* * */

import BackofficeWrapperButtonCreate from '@/components/BackofficeWrapperButtonCreate/BackofficeWrapperButtonCreate';
import { Loader } from '@/components/common/Loader';
import SearchField from '@/components/SearchField/SearchField';

import styles from './BackofficeWrapperList.module.css';

/* * */

export default function BackofficeWrapperList({ children, isCreating, isLoading, onChangeSearchQuery, onCreate, searchQuery }) {
	return (
		<div className={styles.container}>
			{isLoading && <Loader full visible />}
			<div className={styles.header}>
				<SearchField onChange={onChangeSearchQuery} query={searchQuery} />
				<BackofficeWrapperButtonCreate isLoading={isCreating} onClick={onCreate} />
			</div>
			<div className={styles.items}>{children}</div>
		</div>
	);
}
