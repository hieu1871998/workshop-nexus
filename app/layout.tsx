import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { Urbanist } from 'next/font/google'

import '@mantine/core/styles.css'

const urbanist = Urbanist({
	subsets: ['latin'],
	variable: '--font-urbanist',
})

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html>
			<head>
				<ColorSchemeScript />
			</head>
			<body className={urbanist.className}>
				<MantineProvider>{children}</MantineProvider>
			</body>
		</html>
	)
}

export default RootLayout
