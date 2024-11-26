import type { GlobalConfig } from 'payload';

const VideosPage: GlobalConfig = {
	fields: [
		{
			label: 'Imagem',
			name: 'image',
			relationTo: 'media',
			required: true,
			type: 'upload',
		},
		{
			label: 'Logo',
			name: 'logo_right',
			relationTo: 'media',
			required: true,
			type: 'upload',
		},
	],
	slug: 'videosPage',
};

export default VideosPage;
