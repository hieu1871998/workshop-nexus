export interface RegisterPayload {
  email: string
  firstName: string
  lastName: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}
