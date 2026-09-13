'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { resendOtp, verifyOtp } from '@/lib/services'
import { useContext } from "react";
import AuthContext from '@/context/useContext';

const VerifyOtpPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || '';
  const { setUser}: any = useContext(AuthContext);
  const [isloading, setIsloading] = useState<boolean>(false)
  const [message, setmessage] = useState<string>('')
  const [OTP, setOTP] = useState<string[]>(['', '', '', '', '', ''])
  const [cooldown, setCooldown] = useState(60)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown((prev) => prev - 1)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [cooldown])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value

    const newOTP = [...OTP]
    newOTP[index] = value
    setOTP(newOTP)

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleResend = async () => {
    setCooldown(60)
    const res = await resendOtp({ email })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsloading(true)

    const otp = OTP.join('')
    if (otp.length !== 6) {
      setmessage('Please enter a valid 6-digit OTP')
      setIsloading(false)
      return;
    }
    const res = await verifyOtp({ email, otp })
    setIsloading(false)

    if (!res.success) {
      setmessage(res.message)
    }

    if(res.purpose === "login" || res.purpose === "register"){
      setUser({ auth: true, user: res.user })
      router.push(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`)
    }
    if (res.purpose === "forgot-password") {
      router.push(`${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?email=${res.token}`);
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">SP</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Verify OTP
          </h1>

          <p className="text-gray-600 mt-1">
            Enter the OTP sent to your email
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4"
        >
          {message && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {message}
            </div>
          )}

          <div className="flex justify-between gap-2 mb-6">
            {Array(6)
              .fill('')
              .map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={OTP[i]}
                  className="w-11 h-11 text-center text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  ref={(el) => {
                    inputRefs.current[i] = el
                  }}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                />
              ))}
          </div>

          <button
            type="submit"
            disabled={isloading}
            className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isloading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            disabled={cooldown > 0}
            onClick={handleResend}
            className={` hover:text-blue-500 font-medium hover:underline ${
              cooldown > 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 cursor-pointer"
            }`}
          >
            {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtpPage
