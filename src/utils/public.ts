import { useLocation } from 'react-router-dom'
export function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export function getCommiteId() {
  const { commiteId } = JSON.parse(localStorage.getItem('user') || '')
  return commiteId
}
