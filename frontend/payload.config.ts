/* * */

import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { stripePlugin } from '@payloadcms/plugin-stripe';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';

/* * */

import { Admins } from '@/collections/Admins';
import { Categories } from '@/collections/Categories';
import { Media } from '@/collections/Media';
import { Users } from '@/collections/Users';
import { Videos } from '@/collections/Videos';

/* * */

export default buildConfig({

	// Only admins can access the CMS
	admin: {
		user: 'admins',
	},

	// Define and configure your collections in this array
	collections: [
		Admins,
		Categories,
		Media,
		Users,
		Videos,
	],

	// Whichever Database Adapter you're using should go here
	// Mongoose is shown as an example, but you can also use Postgres
	db: mongooseAdapter({
		url: process.env.WEBSITEDB_MONGODB_URI || '',
	}),

	// If you'd like to use Rich Text, pass your editor here
	editor: lexicalEditor(),

	// Define plugins here to extend Payload's functionality
	plugins: [
		stripePlugin({
			stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? '',
			stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_ENDPOINT_SECRET,
			sync: [
				{
					collection: 'users',
					fields: [
						{
							fieldPath: 'email', // this is a field on your own Payload Config
							stripeProperty: 'email', // use dot notation, if applicable
						},
					],
					stripeResourceType: 'customers',
					stripeResourceTypeSingular: 'customer',
				},
			],

			webhooks: {
				'customer.subscription.updated': ({ event, stripe }) => {
					console.log('customer.subscription.updated', event, stripe);
					// do something...
				},
			},
		}),
	],

	// Your Payload secret - should be a complex and secure string, unguessable
	secret: process.env.PAYLOAD_SECRET || '',

	// If you want to resize images, crop, set focal point, etc.
	// make sure to install it and pass it to the config.
	// This is optional - if you don't need to do these things,
	// you don't need it!
	sharp,

});
