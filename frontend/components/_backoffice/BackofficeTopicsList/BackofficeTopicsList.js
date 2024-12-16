'use client';

/* * */

import BackofficeWrapperList from '@/components/BackofficeWrapperList/BackofficeWrapperList';
import BackofficeWrapperListItem from '@/components/BackofficeWrapperListItem/BackofficeWrapperListItem';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import useSearch from '@/hooks/useSearch';
import API from '@/services/API';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';

/* * */

export default function BackofficeTopicsList() {
	//

	//
	// A. Setup variables

	const router = useRouter();
	const { topic_id } = useParams();
	const [searchQuery, setSearchQuery] = useState('');
	const [isCreating, setIsCreating] = useState(false);

	//
	// B. Fetch data

	const { data: allTopicsData, isLoading: allTopicsLoading, mutate: allTopicsMutate } = useSWR('/api/topics');

	//
	// C. Handle search

	const filteredTopicsData = useSearch(searchQuery, allTopicsData, { keys: ['title'] });

	//
	// D. Handle actions

	const handleCreate = async () => {
		try {
			setIsCreating(true);
			const result = await API({ method: 'GET', operation: 'create', service: 'topics' });
			router.push(`/admin/topics/${result._id}`);
			allTopicsMutate();
			setIsCreating(false);
		}
		catch (err) {
			console.log(err);
			setIsCreating(false);
		}
	};

	const handleOpen = async (item_id) => {
		if (topic_id === item_id) return;
		router.push(`/admin/topics/${item_id}`);
	};

	//
	// E. Render components

	return (
		<BackofficeWrapperList isCreating={isCreating} isLoading={allTopicsLoading} onChangeSearchQuery={setSearchQuery} onCreate={handleCreate} searchQuery={searchQuery}>
			{filteredTopicsData && filteredTopicsData.length > 0 ? filteredTopicsData.map(item => <BackofficeWrapperListItem key={item._id} isSelected={topic_id === item._id} onClick={() => handleOpen(item._id)} title={item.title} />) : <NoDataLabel fill />}
		</BackofficeWrapperList>
	);

	//
}
