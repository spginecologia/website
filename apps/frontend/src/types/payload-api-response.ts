/* * */

import { type User } from 'payload-types';

/* * */

export interface PayloadAPIResponse<T> {
	docs: T[]
	hasNextPage: boolean
	hasPrevPage: boolean
	limit: number
	nextPage: null | number
	page: number
	pagingCounter: number
	prevPage: null | number
	totalDocs: number
	totalPages: number
};

export interface PayloadMeResponse {
	collection?: 'users'
	exp?: number | undefined
	message?: string
	strategy?: 'local-jwt'
	token?: string
	user: User
};
