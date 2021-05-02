import { useLocation } from 'react-router-dom'
import { IUser } from '../schems/user'

export function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export function getUserInfo(): IUser {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return user
}

export function nowDate(): String {
  const nowDate = new Date()
  const date = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
  }
  const systemDate = date.year + "-" + (date.month >= 10 ? date.month : "0" + date.month)

  return systemDate
}
