'use client'

import { Toaster } from 'react-hot-toast'
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
		>
			<QueryClientProvider client={queryClient}>
				<LazyMotion features={domAnimation}>
					<NextThemeProvider>
						<NextUIProvider>
							<Toaster />
							{children}
						</NextUIProvider>
					</NextThemeProvider>
				</LazyMotion>
			</QueryClientProvider>
		</NextIntlClientProvider>
	)
}
