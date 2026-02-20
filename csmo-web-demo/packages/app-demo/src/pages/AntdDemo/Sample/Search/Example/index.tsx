import { AppstoreOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { PageContainer, ProForm, ProFormInstance } from '@ant-design/pro-components'
import { FloatButton, Spin } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react'
import Search from './Components/Search';

/**
 * 一般 的 頁面結構範例
 */
const SampleSearch: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    // 資料初始化
    initData()
    // 讀取資料
    readData()

    return () => {
      // 離開頁面前的處理
    }
  }, []);

  const initData = () => {
    // 資料初始化: 呼叫 子頁面的 mobx init 方法 進行資料初始化
  }

  const readData = () => {
    setLoading(true)
    // 讀取資料: 如果需要呼叫 API 取得資料 就在這裡進行
    setLoading(false)
  }

  return (
    <PageContainer
      header={{
        title: false,
        ghost: true
      }}
    >
      <Spin spinning={loading}>
        <ProForm formRef={formRef} submitter={false} layout="vertical">
          {/* 搜尋表單 */}
          <Search />

          {/* 浮層功能區 */}
          <FloatButton.Group
            shape="square"
            trigger="click"
            style={{ bottom: 100 }}
            placement="top"
            icon={<AppstoreOutlined />}
          >
            <FloatButton
              icon={<VerticalAlignTopOutlined />}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                })
                const target = document.getElementById('tabContent') || window
                target.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                })
              }}
            />
            <FloatButton
              icon={<VerticalAlignBottomOutlined />}
              onClick={() => {
                window.scrollTo({
                  top: document.documentElement.scrollHeight,
                  behavior: 'smooth'
                })
                const target = document.getElementById('tabContent') || window
                target.scrollTo({
                  top: document.documentElement.scrollHeight,
                  behavior: 'smooth'
                })
              }}
            />
          </FloatButton.Group>
        </ProForm>
      </Spin>
    </PageContainer>
  )
}

export default observer(SampleSearch)
