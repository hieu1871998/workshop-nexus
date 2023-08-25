export const HomeBackgroundVideo = () => {
  return (
    <div className='-mt-16 relative'>
      <div className='bg-white bg-opacity-80 absolute top-0 right-0 bottom-0 left-0 backdrop-blur-xl' />
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
