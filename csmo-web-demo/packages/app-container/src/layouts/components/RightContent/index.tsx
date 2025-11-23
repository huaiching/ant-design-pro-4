import { useFetchUser } from '@/hooks/useGlobalState'
import useStores from '@/layouts/store'
import { getLocale, SelectLang } from '@@/plugin-locale'
import {
  MessageOutlined,
  QuestionCircleOutlined,
  UserAddOutlined
} from '@ant-design/icons'
import { isSSOLogin, logoutUser, userService } from '@mli-csmo/app-common'
import { Button, Dropdown, Space } from 'antd'
import { observer } from 'mobx-react'
import packageJson from '../../../../../../package.json'
import { initGlobalState, MicroAppStateActions } from 'qiankun'
import React, { useEffect, useMemo } from 'react'
import { history, setLocale } from 'umi'
import { useRedirectUri } from '../../../hooks/useRoute'
import styles from './index.less'

const state = {
  lang: getLocale()
}
export const actions: MicroAppStateActions = initGlobalState(state)

const GlobalHeaderRight: React.FC = () => {
  const stores = useStores()
  const user = useFetchUser()
  const redirectUri = useRedirectUri()
  useEffect(() => {
    stores.getMliAppVersion()
  }, [stores.getMliAppVersion])

  const items = useMemo(() => {
    const array = []
    if (user.departmentCode || user.office) {
      array.push({
        key: user.departmentCode || user.office || '1',
        label: user.departmentCode || user.office || ''
      })
    }
    return array
  }, [user.departmentCode, user.office])

  const handleLogout = () => {
    logoutUser()
    if (isSSOLogin()) {
      if (!userService.token) {
        history.push(`/login?redirectUri=${redirectUri}`)
        return
      }
      if (userService.token && userService.keycloak.isTokenExpired()) {
        userService.keycloak.logout({
          redirectUri: window.location.origin + `/login?redirectUri=${redirectUri}`
        })
        return
      }
      userService.keycloak.logout({
        redirectUri: window.location.origin + `/login?redirectUri=${redirectUri}`
      })
    } else {
      history.push(`/login?redirectUri=${redirectUri}`)
    }
  }
  console.info('版本', packageJson?.version)

  return (
    <Space className={styles.right}>
      <div className={styles.version}>
        <span>
          <span>版本：</span>
          {packageJson?.version}
        </span>
      </div>
      <QuestionCircleOutlined className={styles.icon} />
      <MessageOutlined className={styles.icon} />
      <UserAddOutlined className={styles.icon} />
      <SelectLang
        onItemClick={(params) => {
          setLocale(params.key, false)
          actions.setGlobalState({
            lang: params.key
          })
        }}
        reload={false}
      />
      <Dropdown menu={{ items }}>
        <span> {user.nickname} </span>
      </Dropdown>
      <Button type="link" onClick={handleLogout}>
        退出
      </Button>
      {/* <SelectLang className={styles.action} /> */}
    </Space>
  )
}
export default observer(GlobalHeaderRight)
