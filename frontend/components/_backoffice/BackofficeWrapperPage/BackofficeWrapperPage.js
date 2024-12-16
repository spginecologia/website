/* * */

import BackofficeWrapperButtonClose from '@/components/BackofficeWrapperButtonClose/BackofficeWrapperButtonClose';
import BackofficeWrapperButtonDelete from '@/components/BackofficeWrapperButtonDelete/BackofficeWrapperButtonDelete';
import BackofficeWrapperButtonSave from '@/components/BackofficeWrapperButtonSave/BackofficeWrapperButtonSave';

import styles from './BackofficeWrapperPage.module.css';

/* * */

export default function BackofficeWrapperPage({ children, form, isDeleting, isDirty, isErrorSaving, isErrorValidating, isLoading, isSaving, isValid, isValidating, onClose, onDelete, onSave, title }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.headerStart}>
					<BackofficeWrapperButtonClose isLoading={isLoading || isValidating} onClick={onClose} />
					<h1 className={styles.title}>{title}</h1>
				</div>
				<div className={styles.headerEnd}>
					<BackofficeWrapperButtonSave isDirty={isDirty} isLoading={isSaving} isValid={isValid} onClick={onSave} />
					<BackofficeWrapperButtonDelete isLoading={isDeleting} onClick={onDelete} />
				</div>
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	);
}
