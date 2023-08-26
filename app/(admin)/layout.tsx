import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '../providers'
import { useLocale } from 'next-intl'
import { notFound } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Workshop Nexus',
  description: 'A place to share your ideas with workshops, and to look forward to the upcoming ones.',
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { locale: 'en' | 'vi', },
}) {
  const locale = useLocale()

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound()
  }

  let messages
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    messages = (await import(`../../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers locale={locale} messages={messages as IntlMessages}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
