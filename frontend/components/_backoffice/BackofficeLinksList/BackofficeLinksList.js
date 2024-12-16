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
			const result = await API({ method: 'GET', operation: 'create', service: 'links' });
			router.push(`/admin/links/${result._id}`);
			allLinksMutate();
			setIsCreating(false);
		}
		catch (err) {
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
		<BackofficeWrapperList isCreating={isCreating} isLoading={allLinksLoading} onChangeSearchQuery={setSearchQuery} onCreate={handleCreate} searchQuery={searchQuery}>
			{filteredLinksData && filteredLinksData.length > 0 ? filteredLinksData.map(item => <BackofficeWrapperListItem key={item._id} isSelected={link_id === item._id} onClick={() => handleOpen(item._id)} title={item.title} />) : <NoDataLabel fill />}
		</BackofficeWrapperList>
	);

	//
}
