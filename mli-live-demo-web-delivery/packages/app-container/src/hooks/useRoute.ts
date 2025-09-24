import { useMemo } from 'react'
import { useLocation } from 'umi'

const useQuery = () => {
  const location = useLocation()
  const queryParams = useMemo(
    () => Object.fromEntries(new URLSearchParams(location.search)),
    [location]
  )
  return queryParams
}

const useRedirectUri = () => {
  const location = useLocation()
  return encodeURIComponent(location.pathname + location.search)
}

const useQueryRedirectUri = () => {
  const query = useQuery()
  return query.redirectUri
}

export { useQuery, useRedirectUri, useQueryRedirectUri }
