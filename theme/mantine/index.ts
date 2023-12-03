'use client'

import { generateColors } from '@mantine/colors-generator'
import { createTheme, rem } from '@mantine/core'

import { ButtonTheme, InputTheme } from './components'

export const theme = createTheme({
	colors: {
		chambray: generateColors('#2e4c79'),
		fuchsia: generateColors('#ee49fd'),
	},
	defaultRadius: 'md',
	black: '#202020',
	primaryColor: 'dark',
	cursorType: 'pointer',
	fontFamily: '--var(--font-urbanist)',
	headings: {
		fontFamily: '--var(--font-cal-sans)',
	},
	defaultGradient: {
		from: 'blue-ribbon',
		to: 'fuchsia',
		deg: 120,
	},
	components: {
		Button: ButtonTheme,
		Input: InputTheme,
	},
	fontSizes: {
		xs: rem(12),
		sm: rem(14),
		md: rem(16),
		lg: rem(18),
		xl: rem(20),
		'2xl': rem(24),
		'3xl': rem(30),
		'4xl': rem(36),
		'5xl': rem(48),
		'6xl': rem(60),
		'7xl': rem(72),
		'8xl': rem(96),
	},
})
