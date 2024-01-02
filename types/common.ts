export interface BaseListPayload {
	query?: string
	search?: string
	page?: number
	pageSize?: number
	cursor?: string
	orderBy?: string
	orderDirection?: string
}

export const SortOrder = {
	asc: 'asc',
	desc: 'desc',
}

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]
