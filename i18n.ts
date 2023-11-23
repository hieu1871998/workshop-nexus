import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
	timeZone: 'Asia/Ho_Chi_Minh',
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
	messages: (await import(`./messages/${locale}.json`)).default,
}))
