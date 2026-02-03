/* * */

import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
// import { s3Storage } from '@payloadcms/storage-s3';
import { buildConfig } from 'payload';
import sharp from 'sharp';

/* * */

import { Courses } from '@/services/payload/collections/Course/collection';
import { CourseFiles } from '@/services/payload/collections/CourseFile/collection';
import { Documents } from '@/services/payload/collections/Document/collection';
import { Event } from '@/services/payload/collections/Event/collection';
import { Guidelines } from '@/services/payload/collections/Guideline/collection';
import { InternalDocuments } from '@/services/payload/collections/InternalDocument/collection';
import { Links } from '@/services/payload/collections/Link/collection';
import { Media } from '@/services/payload/collections/Media/collection';
import { News } from '@/services/payload/collections/News/collection';
import { Publications } from '@/services/payload/collections/Publication/collection';
import { Quotas } from '@/services/payload/collections/Quotas/collection';
import { Sections } from '@/services/payload/collections/Section/collection';
import { Topics } from '@/services/payload/collections/Topic/collection';
import { Users } from '@/services/payload/collections/User/collection';
import { Videos } from '@/services/payload/collections/Video/collection';
import { VideoFiles } from '@/services/payload/collections/VideoFile/collection';
import { Workgroups } from '@/services/payload/collections/Workgroup/collection';

/* * */

import { LegalDocuments } from '@/services/payload/globals/LegalDocuments/global';
import { SocialBodies } from '@/services/payload/globals/SocialBodies/global';

/* * */

export default buildConfig({

	// Only admins can access the CMS
	admin: {
		user: 'users',
	},

	// Define and configure your collections in this array
	collections: [
		Courses,
		CourseFiles,
		Documents,
		Event,
		Guidelines,
		InternalDocuments,
		Links,
		Topics,
		Media,
		News,
		Publications,
		Quotas,
		Sections,
		Users,
		Videos,
		VideoFiles,
		Workgroups,
	],

	// Whichever Database Adapter you're using should go here
	// Mongoose is shown as an example, but you can also use Postgres
	db: mongooseAdapter({
		url: process.env.SPGDB_MONGODB_URI || 'mongodb://placeholder:placeholder@localhost:27017/placeholder',
	}),

	// If you'd like to use Rich Text,
	// pass your editor here.
	editor: lexicalEditor(),

	// If you'd like to send emails from Payload,
	// pass your email configuration here.
	email: nodemailerAdapter({
		defaultFromAddress: process.env.EMAIL_FROM_ADDRESS ?? '',
		defaultFromName: process.env.EMAIL_FROM_NAME ?? '',
		skipVerify: true,
		transportOptions: {
			auth: {
				pass: process.env.EMAIL_SERVER_PASSWORD,
				user: process.env.EMAIL_SERVER_USER,
			},
			host: process.env.EMAIL_SERVER_HOST,
			port: Number(process.env.EMAIL_SERVER_PORT ?? 465),
		},
	}),

	// Define and configure your globals in this array
	globals: [
		LegalDocuments,
		SocialBodies,
	],

	// If you'd like to use S3 for file uploads,
	// pass your S3 configuration here.
	// plugins: [
	// 	s3Storage({
	// 		bucket: process.env.CLOUDFLARE_R2_BUCKET ?? 'placeholder',
	// 		collections: {
	// 			'documents': true,
	// 			'internal-documents': true,
	// 			'media': true,
	// 			'video-files': true,
	// 		},
	// 		config: {
	// 			bucketEndpoint: true,
	// 			credentials: {
	// 				accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ?? 'placeholder',
	// 				secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ?? 'placeholder',
	// 			},
	// 			region: 'auto',
	// 			requestHandler: {
	// 				connectionTimeout: 5_000,
	// 				httpAgent: {
	// 					keepAlive: false,
	// 					maxSockets: 300,
	// 				},
	// 				httpsAgent: {
	// 					keepAlive: false,
	// 					maxSockets: 300,
	// 				},
	// 				requestTimeout: 30_000,
	// 			},
	// 		},
	// 	}),
	// ],

	// Your Payload secret - should be a complex and secure string, unguessable
	secret: process.env.PAYLOAD_SECRET || 'placeholder',

	// The URL where Payload is hosted
	serverURL: process.env.NEXT_PUBLIC_URL || 'http://localhost:3005',

	// If you want to resiz	e images, crop, set focal point, etc.
	// make sure to install it and pass it to the config.
	// This is optional - if you don't need to do these things,
	// you don't need it!

	sharp,

});
