'use client';

/* * */

import useSWR from 'swr';
import { useMemo } from 'react';
import styles from './OtherLinks.module.css';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import OtherLinksHeader from '@/components/OtherLinksHeader/OtherLinksHeader';
import OtherLinksFooter from '@/components/OtherLinksFooter/OtherLinksFooter';
import OtherLinksLink from '@/components/OtherLinksLink/OtherLinksLink';
import Loader from '../Loader/Loader';

/* * */

export default function OtherLinks() {
  //

  //
  // A. Fetch data

  const { data: allActiveLinksData, isLoading: allActiveLinksLoading } = useSWR('/api/links/active');

  //
  // B. Transform data

  const allActiveLinksDataSorted = useMemo(() => {
    if (!allActiveLinksData) return [];
    return allActiveLinksData.filter((item) => item.is_active === true);
  });

  //
  // C. Render components

  return (
    <div className={styles.container}>
      <OtherLinksHeader />
      {allActiveLinksLoading ? <Loader visible /> : allActiveLinksDataSorted && allActiveLinksDataSorted.length > 0 ? allActiveLinksDataSorted.map((item) => <OtherLinksLink key={item._id} linkData={item} />) : <NoDataLabel />}
      <OtherLinksFooter />
    </div>
  );

  //
}
