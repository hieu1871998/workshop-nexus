'use client'

import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextIntlProvider } from 'next-intl'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

interface ProvidersProps {
  children: React.ReactNode
  locale: string
  messages: IntlMessages
}

export const Providers = ({
  children,
  locale,
  messages
}: ProvidersProps) => {
  const queryClient = new QueryClient()

  return (
    <NextIntlProvider locale={locale} messages={messages}>
      <QueryClientProvider client={queryClient}>
        <NextThemeProvider>
          <NextUIProvider>
            <Toaster />
            {children}
          </NextUIProvider>
        </NextThemeProvider>
      </QueryClientProvider>
    </NextIntlProvider>
  )
}
