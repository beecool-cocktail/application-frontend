export interface LoginState {
  redirectPath: string
  collectAfterLogin: boolean
}

export interface LoginResult extends LoginState {
  token: string
}
