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

export default function BackofficeLinksList() {
  //

  //
  // A. Setup variables

  const router = useRouter();
  const { link_id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  //
  // B. Fetch data

  const { data: allLinksData, isLoading: allLinksLoading, mutate: allLinksMutate } = useSWR('/api/links/all');

  //
  // C. Handle search

  const filteredLinksData = useSearch(searchQuery, allLinksData, { keys: ['title'] });

  //
  // D. Handle actions

  const handleCreate = async () => {
    try {
      setIsCreating(true);
      const result = await API({ service: 'links', operation: 'create', method: 'GET' });
      router.push(`/admin/links/${result._id}`);
      allLinksMutate();
      setIsCreating(false);
    } catch (err) {
      console.log(err);
      setIsCreating(false);
    }
  };

  const handleOpen = async (item_id) => {
    if (link_id === item_id) return;
    router.push(`/admin/links/${item_id}`);
  };

  //
  // E. Render components

  return (
    <BackofficeWrapperList isLoading={allLinksLoading} searchQuery={searchQuery} onChangeSearchQuery={setSearchQuery} isCreating={isCreating} onCreate={handleCreate}>
      {filteredLinksData && filteredLinksData.length > 0 ? filteredLinksData.map((item) => <BackofficeWrapperListItem key={item._id} title={item.title} onClick={() => handleOpen(item._id)} isSelected={link_id === item._id} />) : <NoDataLabel fill />}
    </BackofficeWrapperList>
  );

  //
}
