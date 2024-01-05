export const PingDot = ({ size = 16 }: { size?: number }) => {
	return (
		<span
			className='relative flex'
			style={{ width: size, height: size }}
		>
			<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75'></span>
			<span
				className='relative inline-flex rounded-full bg-sky-500'
				style={{ width: size, height: size }}
			></span>
		</span>
	)
}
