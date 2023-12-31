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

export default function BackofficeNewsList() {
  //

  //
  // A. Setup variables

  const router = useRouter();
  const { news_id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  //
  // B. Fetch data

  const { data: allNewsData, isLoading: allNewsLoading, mutate: allNewsMutate } = useSWR('/api/news/all');

  //
  // C. Handle search

  const filteredNewsData = useSearch(searchQuery, allNewsData, { keys: ['title'] });

  //
  // D. Handle actions

  const handleCreate = async () => {
    try {
      setIsCreating(true);
      const result = await API({ service: 'news', operation: 'create', method: 'GET' });
      router.push(`/admin/news/${result._id}`);
      allNewsMutate();
      setIsCreating(false);
    } catch (err) {
      console.log(err);
      setIsCreating(false);
    }
  };

  const handleOpen = async (item_id) => {
    if (news_id === item_id) return;
    router.push(`/admin/news/${item_id}`);
  };

  //
  // E. Render components

  return (
    <BackofficeWrapperList isLoading={allNewsLoading} searchQuery={searchQuery} onChangeSearchQuery={setSearchQuery} isCreating={isCreating} onCreate={handleCreate}>
      {filteredNewsData && filteredNewsData.length > 0 ? filteredNewsData.map((item) => <BackofficeWrapperListItem key={item._id} title={item.title} onClick={() => handleOpen(item._id)} isSelected={news_id === item._id} />) : <NoDataLabel fill />}
    </BackofficeWrapperList>
  );

  //
}
