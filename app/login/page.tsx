"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { IoMailOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import { FcGoogle } from 'react-icons/fc'
import { IoLogoFacebook, IoLogoApple } from 'react-icons/io5'

const Page = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login data:', formData)
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full'>
        {/* Logo and Header */}
        <div className='text-center mb-8'>
          <Link href='/'>
            <img 
              src="https://shows.ng/images/logo.svg" 
              alt="Logo" 
              className="h-12 w-auto mx-auto mb-6"
            />
          </Link>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Welcome Back
          </h1>
          <p className='text-gray-600'>
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form Card */}
        <div className='bg-white rounded-2xl shadow-lg p-8'>
          {/* Social Login Buttons */}
          <div className='space-y-3 mb-6'>
            <button className='w-full cursor-pointer flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700'>
              <FcGoogle className='text-xl' />
              Continue with Google
            </button>
            <button className='w-full flex cursor-pointer items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700'>
              <IoLogoFacebook className='text-xl text-blue-600' />
              Continue with Facebook
            </button>
            <button className='w-full flex items-center cursor-pointer justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700'>
              <IoLogoApple className='text-xl' />
              Continue with Apple
            </button>
          </div>

          {/* Divider */}
          <div className='relative my-6'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-4 bg-white text-gray-500'>Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Email Input */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                Email Address
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <IoMailOutline className='text-gray-400 text-xl' />
                </div>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition'
                  placeholder='you@example.com'
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
                Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <IoLockClosedOutline className='text-gray-400 text-xl' />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className='w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition'
                  placeholder='Enter your password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute cursor-pointer inset-y-0 right-0 pr-4 flex items-center'
                >
                  {showPassword ? (
                    <IoEyeOffOutline className='text-gray-400 text-xl hover:text-gray-600' />
                  ) : (
                    <IoEyeOutline className='text-gray-400 text-xl hover:text-gray-600' />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='remember'
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className='h-4 w-4 rounded border-gray-300 text-black focus:ring-black accent-black'
                />
                <label htmlFor='remember' className='ml-2 cursor-pointer text-sm text-gray-700'>
                  Remember me
                </label>
              </div>
              <Link href='/forgot-password' className='text-sm font-medium text-gray-900 hover:text-gray-700'>
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full cursor-pointer bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition'
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600'>
              Don't have an account?{' '}
              <Link href='/signup' className='font-semibold text-gray-900 hover:text-gray-700'>
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Terms and Privacy */}
        <div className='mt-6 text-center'>
          <p className='text-xs text-gray-500'>
            By continuing, you agree to our{' '}
            <Link href='/terms' className='text-gray-700 hover:text-gray-900 underline'>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href='/privacy' className='text-gray-700 hover:text-gray-900 underline'>
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page