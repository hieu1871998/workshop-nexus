'use client'

import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { SubmitHandler, ValidationRule, useForm } from 'react-hook-form'
import { LoginPayload } from '@types'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { LoadingDots } from '@components/LoadingDots'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast'
import GoogleIcon from '@components/icons/Google/google-icon.svg'
import { useTranslations } from 'next-intl'
import { calSans } from '@theme/fonts/calsans'
import { Logo } from '@components/icons/Logo'

const required = {
  value: true,
  message: 'This field is required.',
}

const emailPattern: ValidationRule<RegExp> = {
  // eslint-disable-next-line max-len, no-control-regex
  value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g,
  message: 'Please provide a valid email address.'
}

const passwordPattern: ValidationRule<RegExp> = {
  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
  message: 'Password must be 8+ characters with at least 1 uppercase, 1 lowercase, 1 number, and may include special characters.'
}

export const SignInForm = () => {
  const [loading, setLoading] = useState(false)
  const t = useTranslations()
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm<LoginPayload>()
  const { errors } = formState

  const onSubmit: SubmitHandler<LoginPayload> = (data) => {
    setLoading(true)

    const { email, password } = data

    signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore
    }).then(({ error }) => {
      if (error) {
        setLoading(false)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        toast.error(error)
      } else {
        toast.success('You are signed in!')
        router.refresh()
        router.push('/')
      }
    }).catch(error => {
      setLoading(false)
      console.error('Error fetching user: ', error)
    })
  }

  return (
    <div className='pt-8 pb-4 bg-white rounded-2xl sm:shadow-2xl max-w-xl'>
      <div className='flex flex-col items-center gap-4 pb-4 px-4'>
        <Link href='/'>
          <Logo className='w-12 h-12' />
        </Link>
        <h1 className={`text-2xl text-center font-semibold ${calSans.className}`}>
          {t('common.signIn')}
        </h1>
        <p className='text-center text-gray-900'>
          {t.rich('signin.subtitle', {
            bold: chunk => <span className='font-bold'>{chunk}</span>
          })}
        </p>
      </div>
      <form
        className='px-8 py-4 max-w-xl'
        onSubmit={() => void handleSubmit(onSubmit)}
      >
        <div className='flex flex-col gap-4 mb-4'>
          <div className='flex flex-row'>
            <Input
              id='email'
              {...register('email', {
                required,
                pattern: emailPattern
              })}
              type='email'
              label={t('common.email')}
              validationState={errors.email?.type ? 'invalid' : 'valid'}
              errorMessage={errors.email?.message}
            />
          </div>
          <div className='flex flex-row'>
            <Input
              className='max-w-xl'
              id='password'
              {...register('password', {
                required,
                pattern: passwordPattern
              })}
              type='password'
              label={t('common.password')}
              validationState={errors.password?.type ? 'invalid' : 'valid'}
              errorMessage={errors.password?.message}
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <Button
            className='w-full'
            color='primary'
            type='submit'
            startContent={loading ? (
              <LoadingDots color='#fff' />
            ) : (
              <ArrowRightIcon className='h-4 w-4' />
            )}
          >
            {t('common.signIn')}
          </Button>
          <p className='text-center'>or</p>
          <Button
            className='bg-[#4285F4] text-white'
            startContent={<span className='text-xl'><GoogleIcon /></span>}
            onClick={() => void signIn('google', { callbackUrl: '/' })}
          >
            {t('common.signInWithGoogle')}
          </Button>
        </div>
      </form>
      <p className='text-center text-sm text-gray-900'>
        {t.rich('signin.noAccount', {
          link: chunk => <Link href='/signup' className='font-semibold'>{chunk}</Link>
        })}
      </p>
    </div>
  )
}
