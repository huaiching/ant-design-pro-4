import { observer } from 'mobx-react'
import { useMount } from '@mli-csmo/app-common'

export const AUTH_DATA_SUCCESS = 'sso login success'

const AuthWrapper = () => {
  const sendMessage = () => {
    window.opener.postMessage(AUTH_DATA_SUCCESS, location.origin)
  }

  useMount(() => {
    sendMessage()
  })

  return <div />
}

export default observer(AuthWrapper)
