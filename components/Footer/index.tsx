import Image from 'next/image'
import VercelLogo from '../../public/vercel/logotype/dark/vercel-logotype-dark.png'
import LocaleSwitcher from './LocaleSwitcher'

export const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='container mx-auto px-5 py-10 flex justify-between items-center'>
        <div className='flex gap-10'>
          <a href='https://vercel.com' target='_blank'>
            <Image
              className='h-6 w-auto'
              src={VercelLogo}
              alt=''
              width={100}
              height={100}
              priority
            />
          </a>
          <a href='https://prisma.io' target='_blank'>
            <Image
              className='h-6 w-auto'
              src='https://prismalens.vercel.app/header/logo-dark.svg'
              alt=''
              width={100}
              height={100}
              priority
            />
          </a>
        </div>
        <LocaleSwitcher />
      </div>
    </footer>
  )
}
