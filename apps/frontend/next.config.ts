/* * */

import { withPayload } from '@payloadcms/next/withPayload';
import { type NextConfig } from 'next';

/* * */

const nextConfig: NextConfig = {
	env: {
		NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY : '0x4AAAAAAASWlsU2RF7qF_zi',
		NEXT_PUBLIC_COOKIE_DOMAIN: process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_COOKIE_DOMAIN : '.dev.spginecologia.pt',
		NEXT_PUBLIC_URL: process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_URL : 'https://dev.spginecologia.pt',
	},
	images: {
		remotePatterns: [
			{
				hostname: 'spginecologia.pt',
				port: '',
				protocol: 'https',
			},
		],
	},
	output: 'standalone',
	reactStrictMode: true,
	async redirects() {
		return [
			//
		];
	},
};

/* * */

export default withPayload(nextConfig);
