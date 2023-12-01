export const convertToSlug = (title: string) => {
	return title
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '')
}
