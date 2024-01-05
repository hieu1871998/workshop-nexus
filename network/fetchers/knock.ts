import { fetcher } from '@network/utils/fetcher'
import { KnockIdentifyPayload, KnockNotifyPayload } from '@types'

const headers = { 'Content-Type': 'application/json' }

export const identify = async (payload: KnockIdentifyPayload) => {
	return fetcher('/api/knock/identify', {
		method: 'POST',
		body: JSON.stringify(payload),
		headers,
	})
}

export const notify = async (payload: KnockNotifyPayload) => {
	return fetcher('/api/knock/notify', {
		method: 'POST',
		body: JSON.stringify(payload),
		headers,
	})
}
