import fetcher from './fetcher'
import { IDataUpdate } from './type'

export const auth = (
  mode: 'signin' | 'signup',
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body)
}

export const logout = () => {
  return fetcher('/logout', { token: null })
}

export const userUpdate = (data: IDataUpdate) => {
  return fetcher('/user', data)
}
