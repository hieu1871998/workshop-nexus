import { Providers } from '@app/providers'
import { authOptions } from '@lib/auth'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'
import { Notifications } from '@mantine/notifications'
import { identify } from '@network/fetchers'
import { theme } from '@theme/mantine'
import { Urbanist } from 'next/font/google'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { useLocale } from 'next-intl'

import 'dayjs/locale/en'
import 'dayjs/locale/vi'
import '../globals.css'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/tiptap/styles.css'
import '@mantine/notifications/styles.css'

const urbanist = Urbanist({
	subsets: ['latin'],
	variable: '--font-urbanist',
})

const RootLayout = async ({ children, params }: { children: React.ReactNode; params: { locale: 'en' | 'vi' } }) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const locale = useLocale()

	// Show a 404 error if the user requests an unknown locale
	if (params.locale !== locale) {
		notFound()
	}

	let messages
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		messages = (await import(`../../messages/${locale}.json`)).default
	} catch (error) {
		notFound()
	}

	const session = await getServerSession(authOptions)

	if (session) {
		await identify({
			id: session.user.id ?? '',
			name: session.user.name ?? '',
			email: session.user.email ?? '',
			avatar: session.user.image ?? '',
		})
	}

	return (
		<html>
			<head>
				<ColorSchemeScript />
			</head>
			<body
				id='app'
				className={`${urbanist.className} relative min-h-screen bg-black-haze`}
			>
				<MantineProvider theme={theme}>
					<Providers
						locale={locale}
						messages={messages as IntlMessages}
						session={session}
					>
						<Notifications position='top-right' />
						<DatesProvider settings={{ locale }}>{children}</DatesProvider>
					</Providers>
				</MantineProvider>
			</body>
		</html>
	)
}

export default RootLayout
