/* * */

import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { buildConfig } from 'payload';
import sharp from 'sharp';

/* * */

import { Admins } from '@/payload/collections/Admin/collection';
import { Courses } from '@/payload/collections/Course/collection';
import { Documents } from '@/payload/collections/Document/collection';
import { Event } from '@/payload/collections/Event/collection';
import { Guidelines } from '@/payload/collections/Guideline/collection';
import { Links } from '@/payload/collections/Link/collection';
import { Media } from '@/payload/collections/Media/collection';
import { News } from '@/payload/collections/News/collection';
import { Products } from '@/payload/collections/Product/collection';
import { Publications } from '@/payload/collections/Publication/collection';
import { Sections } from '@/payload/collections/Section/collection';
import { Topics } from '@/payload/collections/Topic/collection';
import { Users } from '@/payload/collections/User/collection';
import { Videos } from '@/payload/collections/Video/collection';
import { VideoFiles } from '@/payload/collections/VideoFile/collection';

/* * */

import { LegalDocuments } from '@/payload/globals/LegalDocuments/global';
import { SocialBodies } from '@/payload/globals/SocialBodies/global';

/* * */

export default buildConfig({

	// Only admins can access the CMS
	admin: {
		user: 'admins',
	},

	// Define and configure your collections in this array
	collections: [
		Admins,
		Courses,
		Documents,
		Event,
		Guidelines,
		Links,
		Topics,
		Media,
		News,
		Products,
		Publications,
		Sections,
		Users,
		Videos,
		VideoFiles,
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
		transportOptions: {
			auth: {
				pass: process.env.EMAIL_SERVER_PASSWORD,
				user: process.env.EMAIL_SERVER_USER,
			},
			host: process.env.EMAIL_SERVER_HOST,
			port: process.env.EMAIL_SERVER_PORT,
		},
	}),

	// Define and configure your globals in this array
	globals: [
		LegalDocuments,
		SocialBodies,
	],

	// If you'd like to use S3 for file uploads,
	// pass your S3 configuration here.
	plugins: [
		s3Storage({
			bucket: process.env.CLOUDFLARE_R2_BUCKET ?? 'placeholder',
			collections: {
				'document': true,
				'media': true,
				'video-files': true,
			},
			config: {
				bucketEndpoint: true,
				credentials: {
					accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ?? 'placeholder',
					secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ?? 'placeholder',
				},
				region: 'auto',
			},
		}),
	],

	// Your Payload secret - should be a complex and secure string, unguessable
	secret: process.env.PAYLOAD_SECRET || 'placeholder',

	// If you want to resize images, crop, set focal point, etc.
	// make sure to install it and pass it to the config.
	// This is optional - if you don't need to do these things,
	// you don't need it!

	sharp,

});
