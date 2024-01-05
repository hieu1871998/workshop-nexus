export interface KnockIdentifyPayload {
	id: string
	name: string
	email: string
	avatar: string
}

export interface KnockNotifyPayload {
	message: string
	showToast: boolean
	userId: string
	tenant: string
}
