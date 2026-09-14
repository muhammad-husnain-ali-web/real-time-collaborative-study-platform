import PrivateRoute from '@/protectedRoute/ProtectedRoute'
import React from 'react'

const Dashboard = () => {
  return (
    <PrivateRoute>
        <div className='flex justify-center items-center h-screen text-2xl font-bold'>
            Dashboard for all authenticated users. This page is protected and can only be accessed by logged-in users. 
        </div>
    </PrivateRoute>
  )
}

export default Dashboard
