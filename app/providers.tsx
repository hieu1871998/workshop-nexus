'use client'

import { Toaster } from 'react-hot-toast'
import { AdminCategoryModal } from '@components/Admin/AdminCategorySection/AdminCategoryModal'
import { AdminWorkshopTagModal } from '@components/Admin/AdminWorkshopTagSection/AdminWorkshopTagModal'
import { KnockFeedProvider } from '@knocklabs/react-notification-feed'
import { ModalsProvider } from '@mantine/modals'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { domAnimation, LazyMotion } from 'framer-motion'
import { Session } from 'next-auth'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

interface ProvidersProps {
	children: React.ReactNode
	locale: string
	messages: IntlMessages
	session: Session | null
}

const modals = {
	adminCategory: AdminCategoryModal,
	adminWorkshopTag: AdminWorkshopTagModal,
}

export const Providers = ({ children, locale, messages, session }: ProvidersProps) => {
	const queryClient = new QueryClient()

	return (
		<NextIntlClientProvider
			locale={locale}
			messages={messages}
			timeZone='Asia/Ho_Chi_Minh'
		>
			<KnockFeedProvider
				userId={session?.user.id ?? ''}
				apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY ?? ''}
				feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID ?? ''}
			>
				<QueryClientProvider client={queryClient}>
					<LazyMotion features={domAnimation}>
						<ModalsProvider modals={modals}>
							<NextThemeProvider>
								<NextUIProvider>
									<Toaster />
									{children}
								</NextUIProvider>
							</NextThemeProvider>
						</ModalsProvider>
					</LazyMotion>
				</QueryClientProvider>
			</KnockFeedProvider>
		</NextIntlClientProvider>
	)
}
