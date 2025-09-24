import useStores from '@/layouts/store'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu, Spin } from 'antd'
import { observer } from 'mobx-react'
import { parse, stringify } from 'querystring'
import type { MenuInfo } from 'rc-menu/lib/interface'
import React from 'react'
import { history } from 'umi'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.less'
import { clearTableSessionStorage } from '@mli-csmo/base'
import { createStyles } from 'antd-style'

export type GlobalHeaderRightProps = {
  menu?: boolean
}

const useStyles = createStyles(({ token }) => {
  return {
    avatar: {
      backgroundColor: token.colorPrimaryBg
    }
  }
})

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { logout, currentUser } = useStores()
  const { styles: styleJs } = useStyles()

  const onMenuClick = (event: MenuInfo) => {
    const { key } = event
    if (key === 'logout') {
      logout()
      clearTableSessionStorage()

      const { pathname } = history.location
      const query = parse(history.location.search)
      const { redirect } = query

      if (window.location.pathname !== '/login' && !redirect) {
        history.replace({
          pathname: '/login',
          search: stringify({
            redirect: pathname
          })
        })
      }

      return
    }
    history.push(`/account/${key}`)
  }

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8
        }}
      />
    </span>
  )

  if (!currentUser || !currentUser.username) {
    return loading
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          個人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          個人設置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登入
      </Menu.Item>
    </Menu>
  )
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styleJs.avatar} alt="avatar">
          {currentUser.username.substring(0, 1).toUpperCase()}
        </Avatar>
      </span>
    </HeaderDropdown>
  )
}

export default observer(AvatarDropdown)
