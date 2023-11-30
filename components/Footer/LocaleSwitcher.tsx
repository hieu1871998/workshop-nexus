'use client'

import { useTransition } from 'react'
import { Select } from '@mantine/core'
import { useLocale, useTranslations } from 'next-intl'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'

const locales = ['en', 'vi']

const { useRouter, usePathname } = createSharedPathnamesNavigation({ locales })

const LocaleSwitcher = () => {
	const t = useTranslations('LocaleSwitcher')
	const [isPending, startTransition] = useTransition()
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()

	const onSelectChange = (value: string | null) => {
		if (value) {
			startTransition(() => {
				router.replace(pathname, { locale: value })
			})
		}
	}

	const data = locales.map(locale => ({
		label: t('locale', { locale }),
		value: locale,
	}))

	return (
		<Select
			defaultValue={locale}
			data={data}
			disabled={isPending}
			onChange={onSelectChange}
			checkIconPosition='right'
			aria-label='Locale Switcher'
		/>
	)
}

export default LocaleSwitcher
