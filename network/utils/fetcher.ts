import { ApiResponse } from '@types'

const baseUrl = process.env.NEXTAUTH_URL ?? ''

export const fetcher = async <D>(input: RequestInfo, config: RequestInit = {}): Promise<D | undefined> => {
	try {
		const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : baseUrl
		const inputWithBaseUrl = typeof input === 'string' ? url + input : input
		const response = await fetch(inputWithBaseUrl, config)

		const json = (await response.json()) as Promise<ApiResponse<D>>

		return (await json).data
	} catch (error) {
		console.error(error)

		return undefined
	}
}
