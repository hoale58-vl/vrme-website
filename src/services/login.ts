import axios from 'axios'
import { LoginBody } from '../state/login'
import { LOGIN } from './consts'

export const loginService = async (obj: LoginBody) => {
  return await axios.post(LOGIN, obj)
}
