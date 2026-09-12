export type UserState = {
  name: string
  email: string
}

export type AuthUserState = {
  auth: boolean
  user: UserState
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