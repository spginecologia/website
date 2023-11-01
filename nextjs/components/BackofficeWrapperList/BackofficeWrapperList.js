'use client';

/* * */

import { useState } from 'react';
import SearchField from '../SearchField/SearchField';
import styles from './BackofficeWrapperList.module.css';
import Loader from '../Loader/Loader';

/* * */

export default function BackofficeWrapperList({ isLoading, header, children }) {
  //

  return (
    <div className={styles.container}>
      {isLoading && <Loader visible full />}
      <div className={styles.header}>{header}</div>
      <div className={styles.items}>{children}</div>
    </div>
  );
}
