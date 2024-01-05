'use client'

import { FC, useCallback, useEffect, useRef, useState } from 'react'
// eslint-disable-next-line import/no-unresolved
import { FeedItem } from '@knocklabs/client/dist/types/clients/feed/interfaces'
import { NotificationFeedPopover, NotificationIconButton, useKnockFeed } from '@knocklabs/react-notification-feed'
import { notifications } from '@mantine/notifications'
import { Session } from 'next-auth'

import '@knocklabs/react-notification-feed/dist/index.css'

interface NotificationCenterProps {
	session: Session | null
}

export const NotificationCenter: FC<NotificationCenterProps> = () => {
	const [visible, setVisible] = useState(false)
	const notifButtonRef = useRef<HTMLButtonElement>(null)
	const { feedClient } = useKnockFeed()

	const onNotificationsReceived = useCallback(({ items }: { items: FeedItem[] }) => {
		items.forEach(notification => {
			if (notification.data?.showToast === false) return

			notifications.show({
				title: 'New notification',
				message: <div dangerouslySetInnerHTML={{ __html: notification.blocks[0].rendered }}></div>,
			})
		})
	}, [])

	useEffect(() => {
		feedClient.on('items.received.realtime', onNotificationsReceived)

		return () => feedClient.off('items.received.realtime', onNotificationsReceived)
	}, [feedClient, onNotificationsReceived])

	return (
		<>
			<NotificationIconButton
				ref={notifButtonRef}
				onClick={() => setVisible(!visible)}
			/>
			<NotificationFeedPopover
				buttonRef={notifButtonRef}
				isVisible={visible}
				onClose={() => setVisible(false)}
			/>
		</>
	)
}
