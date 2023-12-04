'use client'

import { Toaster } from 'react-hot-toast'
import { WorkshopUpdateModal } from '@components'
import { ModalsProvider } from '@mantine/modals'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { domAnimation, LazyMotion } from 'framer-motion'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

interface ProvidersProps {
	children: React.ReactNode
	locale: string
	messages: IntlMessages
}

export const Providers = ({ children, locale, messages }: ProvidersProps) => {
	const queryClient = new QueryClient()

	return (
		<NextIntlClientProvider
			locale={locale}
			messages={messages}
			timeZone='Asia/Ho_Chi_Minh'
		>
			<QueryClientProvider client={queryClient}>
				<LazyMotion features={domAnimation}>
					<ModalsProvider modals={{ workshopUpdate: WorkshopUpdateModal }}>
						<NextThemeProvider>
							<NextUIProvider>
								<Toaster />
								{children}
							</NextUIProvider>
						</NextThemeProvider>
					</ModalsProvider>
				</LazyMotion>
			</QueryClientProvider>
		</NextIntlClientProvider>
	)
}
