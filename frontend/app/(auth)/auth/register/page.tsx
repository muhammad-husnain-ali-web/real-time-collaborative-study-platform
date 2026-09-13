'use client'
import { getPasswordStrength } from '@/lib/strength'
import Link from 'next/link'
import React from 'react'
import {useState} from 'react'
import { userRegister } from '@/lib/services'
import { useRouter } from 'next/navigation';
import { RegisterUser } from '@/lib/types'

const Register = () => {
    const router = useRouter();
    const [form, setForm] = useState<RegisterUser>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isloading, setIsloading] = useState<boolean>(false);
  const [message, setmessage] = useState<string>('');
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [showCnfPwd, setshowCnfPwd] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);
    if (form.password !== form.confirmPassword) {
      setmessage("Passwords do not match");
      setIsloading(false);
      return;
    }
    const strength = getPasswordStrength(form.password);
    if(strength !== "Strong"){
      setmessage("Password should be strong. It should contain at least 8 characters, including uppercase, lowercase, number and special character.");
      setIsloading(false);
      return;
    }

    // Proceed with form submission logic here (e.g., API call)
    const res = await userRegister(form);
    console.log("Register response:", res);
    setIsloading(false);
    if(res.statusCode=== 400){
      setmessage(res.message[0])
    }
    if (!res.success) {
      setmessage(res.message)
    }

    if (res.success) {
        router.push(`${process.env.NEXT_PUBLIC_APP_URL}/auth//verifyOTP?email=${res.email}`);
    }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">SP</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Join StudyPlatform today</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          {(message) && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm">
              {message}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange}
              name="name"   
              required
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={handleChange}
              name="email"
              required
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            {/* <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('STUDENT')}
                className={`py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                  role === 'STUDENT'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/50 dark:border-blue-500 dark:text-blue-400'
                    : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('TEACHER')}
                className={`py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                  role === 'TEACHER'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/50 dark:border-blue-500 dark:text-blue-400'
                    : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                Teacher
              </button>
            </div> */}
          </div>

          <div className='relative'>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type={showPwd ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              name="password"
              required
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="At least 8 characters"
            />
            <img
            onClick={() => setShowPwd(!showPwd)}
            src={showPwd ? "/icons/eye-off.svg" : "/icons/eye.svg"}
            className="absolute right-3 top-9 cursor-pointer"
            alt="toggle"
          />
          </div>

          <div className='relative'>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
            <input
              type={showCnfPwd ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              required
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Re-enter password"
            />
            <img
            onClick={() => setshowCnfPwd(!showCnfPwd)}
            src={showCnfPwd ? "/icons/eye-off.svg" : "/icons/eye.svg"}
            className="absolute right-3 top-9 cursor-pointer"
            alt="toggle"
          />
          </div>

          <button
            type="submit"
            disabled={isloading}
            className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isloading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/auth/login`} className="text-blue-600 hover:text-blue-500 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
