import localFont from 'next/font/local'

export const generalSans = localFont({
	src: [
		{
			path: './GeneralSans-Variable.woff2',
			style: 'normal',
		},
		{
			path: './GeneralSans-VariableItalic.woff2',
			style: 'italic',
		},
	],
	display: 'swap',
})
