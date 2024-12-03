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
