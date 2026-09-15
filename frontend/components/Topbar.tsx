'use client';
import { logout } from '@/lib/services';
import { useRouter } from 'next/navigation';
import { useContext } from "react";
import AuthContext from '@/context/useContext';

export default function Topbar({setSidebarOpen} : any) {
  const router = useRouter();
  const { setUser}: any = useContext(AuthContext);

  const handleLogout = async () => {
    const res = await logout();
    setUser({ auth: false, user: null });
    router.push(`${process.env.NEXT_PUBLIC_APP_URL}/auth/login`);
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
