import { Button } from '@nextui-org/button'
import Image from 'next/image'
import { UserIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export const HeroSection = () => {
  return (
    <section className='container mx-auto flex flex-col items-center'>
      <Image
        src='/logo.svg'
        alt='Workshop Nexus logo'
        width={120}
        height={120}
      />
      <h1 className='text-5xl font-bold text-center mt-10'>
        Workshops Nexus
      </h1>
      <p className='text-4xl text-gray-600 text-center font-medium mt-4'>
        Empowering growth and innovation
      </p>
      <p className='text-center mt-10 text-lg text-gray-500'>
        Where Curiosity Meets Expertise: Dive into Engaging Workshops and Collaborative Learning
      </p>
      <div className='w-full flex justify-center mt-10'>
        <Link href='/signin'>
          <Button
            className='px-10 bg-black text-white'
            radius='full'
            startContent={<UserIcon className='w-4 h-4 text-white' />}
          >
            Sign in and start exploring
          </Button>
        </Link>
      </div>
    </section>
  )
}
