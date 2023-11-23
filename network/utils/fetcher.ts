import { ApiResponse } from '@types'

export const fetcher = async <D>(input: RequestInfo, config: RequestInit = {}): Promise<D | undefined> => {
	try {
		const response = await fetch(input, config)

		const json = (await response.json()) as Promise<ApiResponse<D>>

		return (await json).data
	} catch (error) {
		console.error(error)

		return undefined
	}
}
