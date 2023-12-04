import localFont from 'next/font/local'

export const satoshi = localFont({
	src: [
		{
			path: './Satoshi-Variable.woff2',
			style: 'normal',
		},
		{
			path: './Satoshi-VariableItalic.woff2',
			style: 'italic',
		},
	],
	fallback: ['system-ui', 'arial'],
})
