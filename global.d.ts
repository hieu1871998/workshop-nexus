/// <reference types="next" />
/// <reference types="next/types/global" />
declare module '*.svg' {
	const content: React.FC<React.SVGProps<SVGSVGElement>>
	export default content
}

declare module '*.svg?url' {
	const content: string
	export default content
}

declare module '*.jpg' {
	const content: StaticImageData
	export default content
}

declare module '*.jpeg' {
	const content: StaticImageData
	export default content
}

declare module '*.gif' {
	const content: StaticImageData
	export default content
}

declare module '*.webp' {
	const content: StaticImageData
	export default content
}

declare module '*.ico' {
	const content: StaticImageData
	export default content
}

declare module '*.bmp' {
	const content: StaticImageData
	export default content
}

// Use type safe message keys with `next-intl`
type Messages = typeof import('./messages/en.json')
declare interface IntlMessages extends Messages {}
