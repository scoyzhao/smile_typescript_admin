import { useLocation } from 'react-router-dom'
import { IUser } from '../schems/user'

export function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export function getUserInfo(): IUser {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return user
}
