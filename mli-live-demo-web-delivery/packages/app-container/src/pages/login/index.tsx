import { useState } from 'react'
import { Login } from '@mli-csmo/base'
import { LoginMode, loginModeKey, userService } from '@mli-csmo/app-common'
import { message, Button } from 'antd'
import { observer } from 'mobx-react'
import { useIntl } from 'umi'
import { FormattedMessage } from 'react-intl'
import { useQueryRedirectUri } from '../../hooks/useRoute'
import useStores from '../../layouts/store'

const LoginWrapper = () => {
  const { formatMessage } = useIntl()
  const { userLogin } = useStores()
  const redirect = useQueryRedirectUri()
  const [logining, setLogining] = useState(false)
  const handleSubmit = async (values: any) => {
    try {
      setLogining(true)
      localStorage.setItem(loginModeKey, LoginMode.BasicAuth)
      const loginResult = await userLogin(values.username, values.password, values.autoLogin)
      if (loginResult) {
        const defaultLoginSuccessMessage = formatMessage({
          id: 'login.success'
        })
        message.success(defaultLoginSuccessMessage)
        if (redirect) {
          window.location.replace(redirect)
        } else {
          window.location.replace('/home')
        }
      } else {
        message.error(
          formatMessage({
            id: 'login.fail'
          })
        )
      }
    } catch (error) {
      const { data = {} } = error as any
      if (
        data.statusCode === 401 &&
        (data.message === 'Wrong user name or password.' ||
          data.message === 'User does not exist in the system.' ||
          data.message.includes(
            'Invalid credential for request /common/Security/getLoginUserInfo for user'
          ))
      ) {
        message.error(
          formatMessage({
            id: 'login.fail'
          })
        )
      } else {
        message.error(data.message || formatMessage({ id: 'login.exception' }))
      }
    } finally {
      setLogining(false)
    }
  }

  const handleSSOLogin = async () => {
    try {
      localStorage.setItem(loginModeKey, LoginMode.SSO)
      await userService.login({
        redirectUri: `${window.location.origin}${redirect ? redirect : '/home'}`
      })
    } finally {
    }
  }

  return (
    <Login
      onFinish={handleSubmit}
      submitLoading={logining}
      actions={
        <>
          <Button onClick={handleSSOLogin} loading={logining}>
            <FormattedMessage id="login.btn.sso" />
          </Button>
        </>
      }
    />
  )
}

export default observer(LoginWrapper)
