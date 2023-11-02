/* * */

import styles from './BackofficeWrapperPage.module.css';
import BackofficeWrapperButtonClose from '@/components/BackofficeWrapperButtonClose/BackofficeWrapperButtonClose';
import BackofficeWrapperButtonSave from '@/components/BackofficeWrapperButtonSave/BackofficeWrapperButtonSave';
import BackofficeWrapperButtonDelete from '@/components/BackofficeWrapperButtonDelete/BackofficeWrapperButtonDelete';

/* * */

export default function BackofficeWrapperPage({ form, title, isDirty, isValid, isLoading, isValidating, isErrorValidating, isSaving, isErrorSaving, isDeleting, onClose, onSave, onDelete, children }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerStart}>
          <BackofficeWrapperButtonClose isLoading={isLoading || isValidating} onClick={onClose} />
          <h1 className={styles.title}>{title}</h1>
        </div>
        <div className={styles.headerEnd}>
          <BackofficeWrapperButtonSave isDirty={isDirty} isValid={isValid} isLoading={isSaving} onClick={onSave} />
          <BackofficeWrapperButtonDelete isLoading={isDeleting} onClick={onDelete} />
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
