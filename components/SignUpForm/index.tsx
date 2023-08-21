'use client'

import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { SubmitHandler, ValidationRule, useForm } from 'react-hook-form'
import { RegisterPayload } from '@types'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { LoadingDots } from '@components/LoadingDots'
import { useState } from 'react'

const required = {
  value: true,
  message: 'This field is required.',
}

const emailPattern: ValidationRule<RegExp> = {
  value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g,
  message: 'Please provide a valid email address.'
}

const passwordPattern: ValidationRule<RegExp> = {
  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
  message: 'Password must be 8+ characters with at least 1 uppercase, 1 lowercase, 1 number, and may include special characters.'
}

export const SignUpForm = () => {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, watch, formState } = useForm<RegisterPayload>()

  const { errors } = formState;

  const onSubmit: SubmitHandler<RegisterPayload> = (data) => {
    setLoading(true)

    fetch(
      '/api/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        })
      }
    ).then(async (res) => {
      setLoading(false)

      if (res.status === 200) {
        console.info('Account created! Redirecting to login...');
      } else {
        const { error } = await res.json();
        console.error(error);
      }
    }).catch(error => {
      setLoading(false)
      console.error('Error fetching user: ', error)
    })
  }

  return (
    <div className='pt-8 pb-4 bg-white rounded-2xl sm:shadow-2xl max-w-xl'>
      <div className='flex flex-col items-center gap-4 pb-4 px-4'>
        <Image
          src='/logo.svg'
          alt='Workshop Nexus logo'
          width={40}
          height={40}
        />
        <h1 className='text-2xl text-center font-semibold'>
          Sign up
        </h1>
        <p className='text-center text-gray-600'>
          Join <span className='text-gray-800 font-semibold'>Workshop Nexus</span> and start sharing your knowledge
        </p>
      </div>
      <form
        className='px-8 py-4 max-w-xl'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col gap-4 mb-4'>
          <div className='flex flex-row gap-4'>
            <Input
              id='firstName'
              label='First name'
              {...register('firstName', { required })}
              placeholder='Enter your first name'
              validationState={errors.firstName?.type === 'required' ? 'invalid' : 'valid'}
              errorMessage={errors.firstName?.message}
            />
            <Input
              id='lastName'
              {...register('lastName', { required })}
              label='Last name'
              placeholder='Enter your last name'
              validationState={errors.lastName?.type === 'required' ? 'invalid' : 'valid'}
              errorMessage={errors.lastName?.message}
            />
          </div>
          <div className='flex flex-row'>
            <Input
              id='email'
              {...register('email', {
                required,
                pattern: emailPattern
              })}
              type='email'
              label='Email'
              placeholder='Enter your email'
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
              label='Password'
              placeholder='Enter your password'
              validationState={errors.password?.type ? 'invalid' : 'valid'}
              errorMessage={errors.password?.message}
            />
          </div>
        </div>
        <div className='flex justify-end'>
          <Button
            className='w-full bg-black text-white'
            type='submit'
            endContent={loading ? (
              <LoadingDots color='#fff' />
            ) : (
              <ArrowRightIcon className='h-4 w-4 text-white' />
            )}
          >
            Sign up
          </Button>
        </div>
      </form>
      <p className='mt-4 text-center text-sm text-gray-600'>
        Already have an account?{' '}
        <Link href='/signin' className='font-semibold text-gray-800'>
          Sign in
        </Link>{' '}
        instead.
      </p>
    </div>
  )
}
