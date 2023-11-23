'use client'

import { ChangeEvent, useTransition } from 'react'
import { Avatar, Select, SelectItem } from '@nextui-org/react'
import { useLocale, useTranslations } from 'next-intl'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'

const locales = ['en', 'vi'] as const

const { useRouter, usePathname } = createSharedPathnamesNavigation({ locales })

export default function LocaleSwitcher() {
	const t = useTranslations('LocaleSwitcher')
	const [isPending, startTransition] = useTransition()
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()

	function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
		const nextLocale = event.target.value
		startTransition(() => {
			router.replace(pathname, { locale: nextLocale })
		})
	}

	return (
		<Select
			className='max-w-[160px]'
			size='sm'
			defaultSelectedKeys={[locale]}
			isDisabled={isPending}
			isLoading={isPending}
			onChange={onSelectChange}
			labelPlacement='outside-left'
		>
			{['en', 'vi'].map(cur => (
				<SelectItem
					key={cur}
					value={cur}
					startContent={
						<Avatar
							className='h-5 w-5'
							src={`https://flagcdn.com/${cur === 'en' ? 'us' : 'vn'}.svg`}
						/>
					}
				>
					{t('locale', { locale: cur })}
				</SelectItem>
			))}
		</Select>
	)
}
