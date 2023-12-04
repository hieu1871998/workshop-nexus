'use server'

import { updateWorkshop } from '@network/fetchers'
import { WorkshopUpdatePayload } from '@types'

export const updateWorkshopAction = async (data: WorkshopUpdatePayload) => {
	try {
		const response = await updateWorkshop(data)

		console.log('response: ', response)

		return response
	} catch (error) {
		console.error('Update workshop action error: ', error)
		return data
	}
}
