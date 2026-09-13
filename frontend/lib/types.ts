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


export type FormUser = {
    name: string
    email: string
    password: string
    confirmPassword: string
}   

export enum RegisterRole {
  Student = 'student',
  Teacher = 'teacher',
}

export type RegisterUser = {
    name: string
    email: string
    role: RegisterRole
    password: string
    confirmPassword: string
}   

export type LoginUser = {
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPasswordForm = {
    password: string
    confirmPassword: string
}

export type VerifyOtp = {
    email: string
    otp: string
  }

  export type ResendOtp = {
      email: string
  }

  export type ResetPassword = {
    token: string
    password: string
    confirmPassword: string
}

export enum Role {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin'
}