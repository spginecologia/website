import type { GlobalConfig } from 'payload';

const Account: GlobalConfig = {
	fields: [
		{
			label: 'Logo',
			name: 'logo',
			relationTo: 'media',
			type: 'upload',
		},
		{
			label: 'Logo Logged',
			name: 'logo_logged',
			relationTo: 'media',
			type: 'upload',
		},
	],
	slug: 'account',
};

export default Account;
