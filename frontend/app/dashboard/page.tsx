import React from 'react'
import MainLayout from '@/components/MainLayout'
import PrivateRoute from '@/protectedRoute/ProtectedRoute'

const Dashboard = () => {
  return (
    <PrivateRoute>
        <MainLayout>
            <div className='flex justify-center items-center h-screen text-2xl font-bold'>
              Dashboard for all authenticated users. This page is protected and can only be accessed by logged-in users. 
            </div>
        </MainLayout>
    </PrivateRoute>
  )
}

export default Dashboard
