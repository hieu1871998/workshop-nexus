import '../../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '../../providers'
import { Header } from '@components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Workshop Nexus',
  description: 'A place to share your ideas with workshops, and to look forward to the upcoming ones.',
}

export const generateStaticParams = () => {
  return [{ lang: 'en' }, { lang: 'vi' }]
}

const RootLayout = ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: 'en' | 'vi' };
}) => {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
