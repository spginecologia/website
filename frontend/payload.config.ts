/* * */

import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { stripePlugin } from '@payloadcms/plugin-stripe';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';

/* * */

import { Admins } from '@/schemas/Admin/collection';
import { Documents } from '@/schemas/Document/collection';
import { Event } from '@/schemas/Event/collection';
import { Guidelines } from '@/schemas/Guideline/collection';
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
		Documents,
		Event,
		Guidelines,
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
		url: process.env.SPGDB_MONGODB_URI || '',
	}),

	// If you'd like to use Rich Text, pass your editor here
	editor: lexicalEditor(),

	// Your Payload secret - should be a complex and secure string, unguessable
	secret: process.env.PAYLOAD_SECRET || 'placeholder',

	// If you want to resize images, crop, set focal point, etc.
	// make sure to install it and pass it to the config.
	// This is optional - if you don't need to do these things,
	// you don't need it!
	sharp,

});
