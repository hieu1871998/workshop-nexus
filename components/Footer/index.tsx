'use client'

import NextLogo from '@public/nextjs/icon/light-background/nextjs-icon-light-background.svg?url'
import Turborepo from '@public/turborepo/icon/light-background/turborepo-icon-light-background.svg?url'
import VercelLogo from '@public/vercel/icon/dark/vercel-icon-dark.svg?url'
import Image from 'next/image'

import LocaleSwitcher from './LocaleSwitcher'

export const Footer = () => {
	return (
		<footer className='border-t bg-white'>
			<div className='container mx-auto px-5 py-10'>
				<div className='flex w-full items-center justify-between'>
					<div className='flex gap-6'>
						<a
							href='https://vercel.com'
							target='_blank'
						>
							<Image
								className='h-6 w-auto'
								src={VercelLogo}
								alt=''
								width={100}
								height={100}
								priority
							/>
						</a>
						<a
							href='https://nextjs.org/'
							target='_blank'
						>
							<Image
								className='h-6 w-auto'
								src={NextLogo}
								alt=''
								width={100}
								height={100}
								priority
							/>
						</a>
						<a
							href='https://turbo.build/repo'
							target='_blank'
						>
							<Image
								className='h-6 w-auto'
								src={Turborepo}
								alt=''
								width={100}
								height={100}
								priority
							/>
						</a>
						<a
							href='https://prisma.io'
							target='_blank'
						>
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
			</div>
		</footer>
	)
}
