import '../../globals.css'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import { Providers } from '../../providers'
import { Footer, Header } from '@components'
import { notFound } from 'next/navigation'
import { useLocale } from 'next-intl'

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist'
})

export const metadata: Metadata = {
  title: 'Workshop Nexus',
  description: 'A place to share your ideas with workshops, and to look forward to the upcoming ones.',
}

const RootLayout = async ({
  children,
  params
}: {
  children: React.ReactNode,
  params: { locale: 'en' | 'vi', },
}) => {
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
    <html lang={locale}>
      <body className={urbanist.className}>
        <Providers locale={locale} messages={messages as IntlMessages}>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
