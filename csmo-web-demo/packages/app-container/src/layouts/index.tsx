import logo from '@/statics/logo.png'
import type { ProLayoutProps } from '@ant-design/pro-layout'
import ProLayout from '@ant-design/pro-layout'
import { clearTableSessionStorage, currentTimeROCAmPm } from '@mli-csmo/base'
import {config} from '@mli-csmo/app-common'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import { history, Outlet, useAccess, useIntl } from 'umi'
import { useIsLogin } from '../hooks/useAuth'
import CustomBoundary from './components/CustomBoundary'
import RightContent from './components/RightContent'
import styles from './index.less'

const BasicLayout: React.FC<ProLayoutProps> = () => {
  const { formatMessage } = useIntl()
  const [timeshow, setTimeshow] = useState<string>()
  const [selectedMenuKey, setSelectedMenusKey] = useState<string[]>()
  const { authVerification } = useAccess()
  useIsLogin()
  const timeIntervalRef = useRef<NodeJS.Timeout | null>(null) // 使用 ref 存储定时器

  useEffect(() => {
    // 清除已有定时器
    if (timeIntervalRef.current) {
      clearInterval(timeIntervalRef.current)
    }

    // 添加全局判断逻辑（示例，请根据实际需求修改）
    timeIntervalRef.current = setInterval(() => {
      setTimeshow(currentTimeROCAmPm(formatMessage))
    }, 1000)

    // 清理函数
    return () => {
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current)
      }
    }
  }, [formatMessage]) // 添加全局值到依赖数组

  const defaultRoutes = [
    {
      name: 'micro.home',
      key: 'home',
      path: '/home',
      icon: 'icon-home'
    }
  ]

  const permissionedRoutes = useMemo(() => {
    return config.microApps
      .filter((item) => authVerification(item.authCode?.replace(/\s*/g, '')))
      .map((app) => {
        return {
          name: `micro.${app.appName}`,
          key: app.appName,
          path: app.path,
          icon: app.icon ? app.icon : 'icon-home'
        }
      })
  }, [])

  const generateRoutes = useCallback(() => {
    return [...defaultRoutes, ...permissionedRoutes]
  }, [permissionedRoutes])

  useEffect(() => {
    const pathname = location.pathname
    const allRoutes = generateRoutes()
    const findRoute = allRoutes.find((item) => {
      return pathname.startsWith(item.path) || pathname.startsWith(item.path.replace('/*', ''))
    })
    if (findRoute) {
      setSelectedMenusKey([findRoute.key as string])
    }
  }, [])

  return (
    <div
      style={{
        height: '100vh'
      }}
    >
      <ProLayout
        className="container-layout"
        logo={logo}
        defaultCollapsed={false}
        breakpoint={false}
        siderWidth={72}
        layout="mix"
        title={formatMessage({
          id: 'layout.header.title'
        })}
        navTheme="light"
        fixedHeader
        fixSiderbar
        collapsedButtonRender={false}
        headerContentRender={() => {
          return <>{timeshow}</>
        }}
        actionsRender={() => <RightContent />}
        menuDataRender={generateRoutes}
        ErrorBoundary={CustomBoundary}
        contentStyle={{
          padding: 0
        }}
        selectedKeys={selectedMenuKey}
        menuItemRender={(item) => {
          return (
            <a
              key={item.path}
              className={styles.item}
              onClick={() => {
                clearTableSessionStorage()
                const path = item.path || '/'
                setSelectedMenusKey([item.key as string])
                history.replace(path)
              }}
            >
              <div className={styles.icon}>
                <i className={`iconfont ${item.icon} ${styles.iconfont}`} />
              </div>
              <div className={styles.title}>
                {formatMessage({
                  id: item.name
                })}
              </div>
            </a>
          )
        }}
      >
        <div className={styles.microApps}>
          <Outlet />
        </div>
      </ProLayout>
    </div>
  )
}

export default BasicLayout
