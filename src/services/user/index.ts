import configs from 'config/config'
import { LOCAL_STORAGE_KEY } from 'services/localStorage'
import HttpUtility, { isHttpErrorResponseModel } from 'services/utilities'
import { LogginUser } from './types'

export function getLoggedInUser (): LogginUser | null {
  const loggedInUser = localStorage.getItem(LOCAL_STORAGE_KEY.USER)
  if (loggedInUser) {
    return JSON.parse(loggedInUser) as LogginUser
  }
  return null
}

export async function login (
  address: string,
  signature: string,
  publicKey: string
): Promise<LogginUser> {
  let loggedInUser = getLoggedInUser()
  if (loggedInUser) {
    return loggedInUser
  }

  const endpoint = `${configs.baseUrl}${configs.api.user.login}`
  return await HttpUtility.post(endpoint, {
    address,
    signature,
    publicKey
  }).then((res) => {
    if (isHttpErrorResponseModel(res)) {
      throw new Error(res.message)
    } else {
      loggedInUser = { token: res.data }
      localStorage.setItem(LOCAL_STORAGE_KEY.USER, JSON.stringify(loggedInUser))
      return loggedInUser
    }
  })
}
