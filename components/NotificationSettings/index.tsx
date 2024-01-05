'use client'

import { Button, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notify } from '@network/fetchers'
import { KnockNotifyPayload } from '@types'
import { Session } from 'next-auth'

export const NotificationSettings = ({ session }: { session: Session | null }) => {
	const form = useForm<KnockNotifyPayload>()

	const onSubmit = async (values: KnockNotifyPayload) => {
		await notify({ message: values.message, showToast: true, userId: session?.user.id ?? '', tenant: '' })
	}

	return (
		<form onSubmit={form.onSubmit(values => void onSubmit(values))}>
			<Textarea
				{...form.getInputProps('message')}
				label='Message'
			/>
			<Button type='submit'>Send notification</Button>
		</form>
	)
}
