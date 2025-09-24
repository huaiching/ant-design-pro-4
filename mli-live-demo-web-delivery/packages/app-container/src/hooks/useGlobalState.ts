import { MliUserInfo } from '@mli-csmo/app-common'
import { useModel } from 'umi'

/**
 *
 * @returns 
 */
export function useFetchUser(): MliUserInfo {
  const masterProps = useModel('@@qiankunStateForSlave')
  return masterProps?.currentUser || {}
}
