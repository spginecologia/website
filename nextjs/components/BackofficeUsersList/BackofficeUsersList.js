'use client';

/* * */

import useSWR from 'swr';
import { useState } from 'react';
import styles from './BackofficeUsersList.module.css';
import BackofficeWrapperList from '@/components/BackofficeWrapperList/BackofficeWrapperList';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import useSearch from '@/hooks/useSearch';
import BackofficeUsersListItem from '@/components/BackofficeUsersListItem/BackofficeUsersListItem';
import API from '@/services/API';

/* * */

export default function BackofficeUsersList() {
  //

  //
  // A. Setup variables

  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  //
  // B. Fetch data

  const { data: allUsersData, isLoading: allUsersLoading, mutate: allUsersMutate } = useSWR('/api/users');

  //
  // C. Handle search

  const filteredUsersData = useSearch(searchQuery, allUsersData, { keys: ['name', 'email', 'phone'] });

  //
  // D. Handle actions

  const handleCreate = async () => {
    try {
      setIsCreating(true);
      await API({ service: 'users', operation: 'create', method: 'GET' });
      allUsersMutate();
      setIsCreating(false);
    } catch (err) {
      console.log(err);
      setIsCreating(false);
    }
  };

  //
  // E. Render components

  return (
    <BackofficeWrapperList isLoading={allUsersLoading} searchQuery={searchQuery} onChangeSearchQuery={setSearchQuery} isCreating={isCreating} onCreate={handleCreate}>
      {filteredUsersData && filteredUsersData.length > 0 ? filteredUsersData.map((item) => <BackofficeUsersListItem key={item._id} _id={item._id} name={item.name} email={item.email} />) : <NoDataLabel fill />}
    </BackofficeWrapperList>
  );

  //
}
