export const HomeBackgroundVideo = () => {
	return (
		<div className='relative -mt-16'>
			<div className='absolute bottom-0 left-0 right-0 top-0 bg-black-haze bg-opacity-80 backdrop-blur-xl' />
			<video
				src={'/background-video.mp4'}
				autoPlay
				muted
				// controls
				loop
			/>
		</div>
	)
}
