export interface BaseListPayload {
	query?: string
	page?: number
	pageSize?: number
	cursor?: string
	orderBy?: string
	orderDirection?: string
}
