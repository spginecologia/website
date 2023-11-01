'use client';

/* * */

import useSWR from 'swr';
import { useState } from 'react';
import styles from './BackofficeUsersList.module.css';
import BackofficeWrapperList from '@/components/BackofficeWrapperList/BackofficeWrapperList';
import SearchField from '@/components/SearchField/SearchField';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import useSearch from '@/hooks/useSearch';
import BackofficeUsersListItem from '@/components/BackofficeUsersListItem/BackofficeUsersListItem';

/* * */

export default function BackofficeUsersList() {
  //

  //
  // A. Setup variables

  const [searchQuery, setSearchQuery] = useState('');

  //
  // B. Fetch data

  const { data: allUsersData, error: allUsersError, isLoading: allUsersLoading, mutate: allUsersMutate } = useSWR('/api/users');

  //
  // C. Handle search

  const filteredUsersData = useSearch(searchQuery, allUsersData, { keys: ['name', 'email', 'phone'] });

  //
  // D. Render components

  return (
    <BackofficeWrapperList
      isLoading={allUsersLoading}
      header={
        <>
          <SearchField query={searchQuery} onChange={setSearchQuery} />
        </>
      }
    >
      {filteredUsersData && filteredUsersData.length > 0 ? filteredUsersData.map((item) => <BackofficeUsersListItem key={item._id} _id={item._id} name={item.name} email={item.email} />) : <NoDataLabel />}
    </BackofficeWrapperList>
  );

  //
}
