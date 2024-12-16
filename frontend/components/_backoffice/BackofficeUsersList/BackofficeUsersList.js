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

export default function BackofficeUsersList() {
	//

	//
	// A. Setup variables

	const router = useRouter();
	const { user_id } = useParams();
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
			const result = await API({ method: 'GET', operation: 'create', service: 'users' });
			router.push(`/admin/users/${result._id}`);
			allUsersMutate();
			setIsCreating(false);
		}
		catch (err) {
			console.log(err);
			setIsCreating(false);
		}
	};

	const handleOpen = async (item_id) => {
		if (user_id === item_id) return;
		router.push(`/admin/users/${item_id}`);
	};

	//
	// E. Render components

	return (
		<BackofficeWrapperList isCreating={isCreating} isLoading={allUsersLoading} onChangeSearchQuery={setSearchQuery} onCreate={handleCreate} searchQuery={searchQuery}>
			{filteredUsersData && filteredUsersData.length > 0 ? filteredUsersData.map(item => <BackofficeWrapperListItem key={item._id} isSelected={user_id === item._id} onClick={() => handleOpen(item._id)} subtitle={item.personal_tax_id} title={item.display_name} />) : <NoDataLabel fill />}
		</BackofficeWrapperList>
	);

	//
}
