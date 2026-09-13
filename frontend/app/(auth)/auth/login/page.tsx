'use client';

import { userLogin } from '@/lib/services';
import { AuthUserState, LoginUser } from '@/lib/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useContext } from "react";
import AuthContext from '@/context/useContext';

export default function LoginPage() {

  const { setUser}: any = useContext(AuthContext);

  const router = useRouter();
      const [form, setForm] = useState<LoginUser>({
      email: "",
      password: ""
    });

      const [isloading, setIsloading] = useState<boolean>(false);
      const [message, setmessage] = useState<string>('');
      const [showPwd, setShowPwd] = useState<boolean>(false);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setForm({ ...form, [e.target.name]: e.target.value });
        };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsloading(true);
        setmessage('');

        const res = await userLogin(form);
        console.log("Login response:", res);
        setIsloading(false);

        if (!res.success) {
          setmessage(res.message)
        }

        if (res.success && res.twofa) {
          router.push(`${process.env.NEXT_PUBLIC_APP_URL}/auth/twofa?email=${res.email}`);
        }

        if (res.success && !res.twofa) {
          const userData: AuthUserState = {
            auth: true,
            user: res.user
          };
          setUser(userData);
          router.push(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`);
        }

      };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">SP</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
          <p className="text-gray-600 mt-1">Welcome back to StudyPlatform</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          {(message) && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm">
              {message}
            </div>
          )}

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

          <div className='relative'>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type={showPwd ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              name="password"
              required
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter your password"
            />
            <img
            onClick={() => setShowPwd(!showPwd)}
            src={showPwd ? "/icons/eye-off.svg" : "/icons/eye.svg"}
            className="absolute right-3 top-9 cursor-pointer"
            alt="toggle"
          />
          </div>

          <button
            type="submit"
            disabled={isloading}
            className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isloading ? 'Signing in...' : 'Sign In'}
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{' '}
          <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/auth/register`} className="text-blue-600 hover:text-blue-500 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
