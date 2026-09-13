
'use client'
import React, { useState, useEffect } from 'react'
import AuthContext from './useContext'
import { userFound } from '@/lib/services'
import { AuthUserState, ContextProviderProps } from '@/lib/types'

const AuthProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<AuthUserState | null>(null)

  async function getUser() {
    try {
      const res = await userFound();
    setUser({ auth: res.auth, user: res.user });
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
