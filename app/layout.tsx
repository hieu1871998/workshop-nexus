import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Header } from '@components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Workshop Nexus',
  description: 'A place to share your ideas with workshops, and to look forward to the upcoming ones.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
