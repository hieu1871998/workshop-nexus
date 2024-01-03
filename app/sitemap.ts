import { MetadataRoute } from 'next'

const sitemap = (): MetadataRoute.Sitemap => {
	return [
		{
			url: 'https://workshopnexus.vercel.app',
			lastModified: new Date(),
		},
		{
			url: 'https://workshopnexus.vercel.app/signin',
			lastModified: new Date(),
		},
		{
			url: 'https://workshopnexus.vercel.app/user/:id',
			lastModified: new Date(),
		},
		{
			url: 'https://workshopnexus.vercel.app/workshop/:slug',
			lastModified: new Date(),
		},
		{
			url: 'https://workshopnexus.vercel.app/workshop/apply',
			lastModified: new Date(),
		},
		{
			url: 'https://workshopnexus.vercel.app/workshop/listing',
			lastModified: new Date(),
		},
	]
}

export default sitemap
