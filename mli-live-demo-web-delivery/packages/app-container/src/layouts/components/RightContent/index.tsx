import { useFetchUser } from '@/hooks/useGlobalState'
import useStores from '@/layouts/store'
import { getLocale, SelectLang } from '@@/plugin-locale'
import {
  MessageOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons'
import { isSSOLogin, logoutUser, userService } from '@mli-csmo/app-common'
import { Button, Dropdown, message, Popover, Space } from 'antd'
import { observer } from 'mobx-react'
import { initGlobalState, MicroAppStateActions } from 'qiankun'
import React, { useEffect, useMemo } from 'react'
import { history, setLocale } from 'umi'
import packageJson from '../../../../../../package.json'
import { useRedirectUri } from '../../../hooks/useRoute'
import styles from './index.less'

const state = {
  lang: getLocale()
}
export const actions: MicroAppStateActions = initGlobalState(state)

const GlobalHeaderRight: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
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

  const webIntroduction = (
    <div>
      <p><b>網站介紹</b></p>
      <p>這是Live Demo網站，提供理賠資訊查詢與展示前端套件功能</p>
    </div>
  )

  const messageContent = (
    <div>
      <p><b>訊息</b></p>
      <p>目前沒功能</p>
    </div>
  )

  return (
    <Space className={styles.right}>
      {contextHolder}
      {/* <MoneyCollectOutlined className={styles.icon} /> */}
      {/* <div className={styles.version}>
        <span>
          {'MLI-' +
            stores.cmsVersion.version +
            '-CMS-' +
            stores.cmsVersion.extentions?.platform.buildVersion +
            '-' +
            releaseOrStage +
            '-' +
            formatDate +
            '(' +
            gitHash +
            ')'}
        </span>
      </div> */}
      <div className={styles.version}>
        <span>
          <span>版本：</span>
          {packageJson?.version}
        </span>
      </div>
      <Popover content={webIntroduction} trigger="click">
        <QuestionCircleOutlined className={styles.icon} />
      </Popover>

      <Popover content={messageContent} trigger={'click'}>
        <MessageOutlined className={styles.icon} />
      </Popover>

      <i className={`fa-regular fa-thumbs-up ${styles.icon}`}
        onClick={() => {
          messageApi.open({
            type: 'success',
            content: '很讚'
          })
        }}
        style={{ cursor: 'pointer' }}
      />
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
