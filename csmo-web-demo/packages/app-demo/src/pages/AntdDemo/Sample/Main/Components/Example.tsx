import { AppstoreOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer, ProForm, ProFormInstance } from '@ant-design/pro-components'
import { Button, FloatButton } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react'

const myExample: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  useEffect(() => {
    // 資料初始化
    initData()
    // 讀取資料
    readData()
  }, []);

  const initData = () => {
    // 資料初始化
  }

  const readData = () => {
    // 讀取資料
  }

  return (
    <PageContainer
      header={{
        title: false,
        ghost: true
      }}
    >
      <ProForm formRef={formRef} submitter={false} layout="vertical">
        <>頁面內容</>

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
            // tooltip='回頂部'
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
            // tooltip='到底部'
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

        {/* 底部功能區 */}
        <FooterToolbar>
          <Button type='primary'>功能按鈕</Button>
        </FooterToolbar>
      </ProForm>
    </PageContainer>
  )
}

export default observer(myExample)
