export type LoginFormValues = {
  empId: string
  password: string
}

export type SprJson = {
  code?: string
  error?: string
  loginSuccess?: 'false' | 'true'
}
