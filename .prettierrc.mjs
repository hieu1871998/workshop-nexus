/** @type import('prettier').Config */
const config = {
	arrowParens: 'avoid',
	bracketSameLine: false,
	bracketSpacing: true,
	endOfLine: 'auto',
	jsxSingleQuote: true,
	printWidth: 120,
	quoteProps: 'as-needed',
	semi: false,
	tabWidth: 2,
	useTabs: true,
	singleAttributePerLine: true,
	singleQuote: true,
	trailingComma: 'es5',
	plugins: ['prettier-plugin-tailwindcss'],
}

export default config
