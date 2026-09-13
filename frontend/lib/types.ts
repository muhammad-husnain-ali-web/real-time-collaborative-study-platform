export type UserState = {
  name: string
  email: string
}

type UserContextType = {
  _id: number, 
  name: string,
  role: string, 
  image: string | null, 
  twofa: boolean 
}

export type AuthUserState = {
  auth: boolean
  user: UserContextType | null
}

export type ContextProviderProps = {
  children: React.ReactNode
}

export type RegisterUser = {
    name: string
    email: string
    password: string
    confirmPassword: string
}     

export type LoginUser = {
    email: string
    password: string
}