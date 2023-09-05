import '../../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '../../providers'
import { useLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@lib/auth'
import { AdminHeader, Footer } from '@components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin | Zenith',
  description: 'A place to share your ideas with workshops, and to look forward to the upcoming ones.',
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { locale: 'en' | 'vi' },
}) {
  const session = await getServerSession(authOptions)

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
          <AdminHeader />
          {session?.user.role === 'ADMIN' ? children : (
            <main className='min-h-screen flex justify-center items-center'>
              Unauthorized
            </main>
          )}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
