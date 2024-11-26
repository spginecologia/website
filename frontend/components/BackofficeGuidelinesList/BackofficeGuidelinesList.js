'use client';

/* * */

import useSWR from 'swr';
import { useState } from 'react';
import { useRouter } from '@/translations/navigation';
import { useParams } from 'next/navigation';
import API from '@/services/API';
import useSearch from '@/hooks/useSearch';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import BackofficeWrapperList from '@/components/BackofficeWrapperList/BackofficeWrapperList';
import BackofficeWrapperListItem from '@/components/BackofficeWrapperListItem/BackofficeWrapperListItem';

/* * */

export default function BackofficeGuidelinesList() {
  //

  //
  // A. Setup variables

  const router = useRouter();
  const { guideline_id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  //
  // B. Fetch data

  const { data: allGuidelinesData, isLoading: allGuidelinesLoading, mutate: allGuidelinesMutate } = useSWR('/api/guidelines/all');

  //
  // C. Handle search

  const filteredGuidelinesData = useSearch(searchQuery, allGuidelinesData, { keys: ['title'] });

  //
  // D. Handle actions

  const handleCreate = async () => {
    try {
      setIsCreating(true);
      const result = await API({ service: 'guidelines', operation: 'create', method: 'GET' });
      router.push(`/admin/guidelines/${result._id}`);
      allGuidelinesMutate();
      setIsCreating(false);
    } catch (err) {
      console.log(err);
      setIsCreating(false);
    }
  };

  const handleOpen = async (item_id) => {
    if (guideline_id === item_id) return;
    router.push(`/admin/guidelines/${item_id}`);
  };

  //
  // E. Render components

  return (
    <BackofficeWrapperList isLoading={allGuidelinesLoading} searchQuery={searchQuery} onChangeSearchQuery={setSearchQuery} isCreating={isCreating} onCreate={handleCreate}>
      {filteredGuidelinesData && filteredGuidelinesData.length > 0 ? filteredGuidelinesData.map((item) => <BackofficeWrapperListItem key={item._id} title={item.title} onClick={() => handleOpen(item._id)} isSelected={guideline_id === item._id} />) : <NoDataLabel fill />}
    </BackofficeWrapperList>
  );

  //
}
