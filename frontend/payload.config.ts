import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';

export default buildConfig({
	// Define and configure your collections in this array
	collections: [],

	// Whichever Database Adapter you're using should go here
	// Mongoose is shown as an example, but you can also use Postgres
	db: mongooseAdapter({
		url: process.env.WEBSITEDB_MONGODB_URI || '',
	}),

	// If you'd like to use Rich Text, pass your editor here
	editor: lexicalEditor(),
	// Your Payload secret - should be a complex and secure string, unguessable
	secret: process.env.PAYLOAD_SECRET || '',
	// If you want to resize images, crop, set focal point, etc.
	// make sure to install it and pass it to the config.
	// This is optional - if you don't need to do these things,
	// you don't need it!
	sharp,
});
