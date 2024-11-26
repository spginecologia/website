import type { CollectionSlug, DataFromCollectionSlug } from 'payload';

/**
 * Define custom URL resolver functions.
 * Each collection type should have its own resolver function.
 */
export const customUrlResolvers: Record<
	CollectionSlug,
	(doc: DataFromCollectionSlug<CollectionSlug>) => null | string
> = {
	'categories': () => {
		throw new Error('Function not implemented.');
	},
	'consensos': () => {
		throw new Error('Function not implemented.');
	},
	'courses': () => {
		throw new Error('Function not implemented.');
	},
	'events': () => {
		throw new Error('Function not implemented.');
	},
	'media': () => {
		throw new Error('Function not implemented.');
	},
	'members': () => {
		throw new Error('Function not implemented.');
	},
	'noticias': () => {
		throw new Error('Function not implemented.');
	},
	'nucleos': () => {
		throw new Error('Function not implemented.');
	},
	'paginas': () => {
		throw new Error('Function not implemented.');
	},
	'payload-locked-documents': () => {
		throw new Error('Function not implemented.');
	},
	'payload-migrations': () => {
		throw new Error('Function not implemented.');
	},
	'payload-preferences': () => {
		throw new Error('Function not implemented.');
	},
	'prizes': () => {
		throw new Error('Function not implemented.');
	},
	'publications': () => {
		throw new Error('Function not implemented.');
	},
	'sections': () => {
		throw new Error('Function not implemented.');
	},
	'users': () => {
		throw new Error('Function not implemented.');
	},
	'videos': () => {
		throw new Error('Function not implemented.');
	},
};
