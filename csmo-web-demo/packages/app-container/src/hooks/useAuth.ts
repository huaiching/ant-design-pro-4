import { useEffect } from 'react'
import useStores from '../layouts/store'
import { history, useAccess, useModel } from 'umi'
import { config } from '@mli-csmo/app-common'

export const useIsLogin = () => {
  const { checkUserIsLogin } = useStores()
  const { authVerification } = useAccess()
  const masterProps = useModel('@@qiankunStateForSlave')

  useEffect(() => {
    return history.listen(({ location }) => {
      const currentContainer = location.pathname
      config.microApps.forEach((item) => {
        // 檢查是否擁有目前路徑的權限
        if (currentContainer.indexOf(item.path) !== -1 && !authVerification(item.authCode)) {
          history.replace('/home')
        }
      })
    })
  }, [])

  useEffect(() => {
    checkUserIsLogin().then((user) => {
      // 更新用戶訊息，下發給子應用
      masterProps.setCurrentUser(user)
    })

  }, [])
}
