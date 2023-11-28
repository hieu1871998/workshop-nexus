'use client'

import { generateColors } from '@mantine/colors-generator'
import { createTheme } from '@mantine/core'

import { ButtonTheme, InputTheme } from './components'

export const theme = createTheme({
	colors: {
		chambray: generateColors('#2e4c79'),
		fuchsia: generateColors('#ee49fd'),
	},
	defaultRadius: 'md',
	black: '#202020',
	primaryColor: 'chambray',
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
})
