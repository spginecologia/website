/* * */

import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { buildConfig } from 'payload';
import sharp from 'sharp';

/* * */

import { Admins } from '@/schemas/Admin/collection';
import { Courses } from '@/schemas/Course/collection';
import { Documents } from '@/schemas/Document/collection';
import { Event } from '@/schemas/Event/collection';
import { Guidelines } from '@/schemas/Guideline/collection';
import { Links } from '@/schemas/Link/collection';
import { Media } from '@/schemas/Media/collection';
import { News } from '@/schemas/News/collection';
import { Publications } from '@/schemas/Publication/collection';
import { Topics } from '@/schemas/Topic/collection';
import { Users } from '@/schemas/User/collection';
import { Videos } from '@/schemas/Video/collection';
import { VideoFiles } from '@/schemas/VideoFile/collection';

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
		Publications,
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
