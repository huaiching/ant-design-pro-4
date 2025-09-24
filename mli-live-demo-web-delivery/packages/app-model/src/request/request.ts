import { request } from '@mli-csmo/base'
import { pathConfig } from './pathConfig'

export const baseRequest = async <T = any>(url: string, options: any) => {
  const fullUrl = pathConfig.baseApi + url

  return request<T>(fullUrl, options)
}
