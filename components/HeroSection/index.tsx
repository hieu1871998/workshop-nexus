import { UserSection } from './UserSection'

export const HeroSection = () => {
  return (
    <section className='container mx-auto flex flex-col items-center'>
      <h1 className='text-5xl font-bold text-left sm:text-center'>
        Empowering growth and innovation
      </h1>
      <p className='text-3xl sm:text-4xl text-gray-600 text-left sm:text-center font-medium mt-4'>
        Where Curiosity Meets Expertise: Dive into Engaging Workshops and Collaborative Learning
      </p>
      <div className='w-full flex justify-start sm:justify-center mt-10'>
        <UserSection />
      </div>
    </section>
  )
}
