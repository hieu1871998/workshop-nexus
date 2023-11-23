module.exports = {
	extends: [
		'next/core-web-vitals',
		'eslint:recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:react/jsx-runtime',
		'plugin:prettier/recommended',
	],
	plugins: ['prettier', '@typescript-eslint', 'import', 'simple-import-sort'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: true,
		tsConfigRootDir: __dirname,
	},
	root: true,
	rules: {
		'prettier/prettier': 'warn',
		'simple-import-sort/exports': 2,
		'simple-import-sort/imports': [
			2,
			{
				groups: [['^react', '^@?\\w'], ['^(@/components)(/.*|$)', '^\\.((?!.(css|scss)).)*$'], ['^[^.]']],
			},
		],
	},
	ignorePatterns: ['.eslintrc.cjs', '*.config.js'],
}
