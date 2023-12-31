const withNextIntl = require('next-intl/plugin')(
	// This is the default (also the `src` folder is supported out of the box)
	'./i18n.ts'
)

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizePackageImports: ['@mantine/core', '@heroicons/react', 'lodash'],
	},
	webpack: (config, { isServer }) => {
		// Configures webpack to handle SVG files with SVGR. SVGR optimizes and transforms SVG files
		// into React components. See https://react-svgr.com/docs/next/

		// Grab the existing rule that handles SVG imports
		// @ts-ignore - this is a private property that is not typed
		const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'))

		config.module.rules.push(
			// Reapply the existing rule, but only for svg imports ending in ?url
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			// Convert all other *.svg imports to React components
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
				use: ['@svgr/webpack'],
			}
		)

		// Modify the file loader rule to ignore *.svg, since we have it handled now.
		fileLoaderRule.exclude = /\.svg$/i

		return config
	},
	transpilePackages: ['@nextui-org/react', 'lodash'],
	modularizeImports: {
		lodash: {
			transform: 'lodash/{{member}}',
		},
		'react-icons': {
			transform: 'react-icons/{{member}}',
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'joavrto5a5xvddgg.public.blob.vercel-storage.com',
			},
		],
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
}

module.exports = withNextIntl(nextConfig)
