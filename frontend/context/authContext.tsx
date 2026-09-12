
'use client'
import React, { useState, useEffect } from 'react'
import AuthContext from './useContext'
// import { userFound } from '@/lib/services'
import { AuthUserState, ContextProviderProps } from '@/lib/types'

// type User = {
//   name: string
//   email: string
// }

// type AuthUser = {
//   auth: boolean
//   user: User
// }

// type ContextProviderProps = {
//   children: React.ReactNode
// }

const AuthProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<AuthUserState | null>(null)

  async function getUser() {
    try {
    //   const res = await userFound();
    // setUser({ auth: res.auth, user: res.user });
    setUser({ auth: true, user: { name: 'John Doe', email: 'john.doe@example.com' } })
    console.log("User fetched:", user)
    } catch (err) {
      console.error("Error fetching user:", err)
      setUser(null)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
