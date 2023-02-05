export interface UserModel {
  name: string
}

export interface LogginUser {
  token: string
  profile?: UserModel
}

export const SIGNIN_MESSAGE = 'Require signature for login'
