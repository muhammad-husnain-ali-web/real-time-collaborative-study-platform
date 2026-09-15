'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:ml-64">
        <Topbar setSidebarOpen={setSidebarOpen} />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
