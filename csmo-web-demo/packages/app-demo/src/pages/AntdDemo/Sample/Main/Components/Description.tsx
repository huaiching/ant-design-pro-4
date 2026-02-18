import CodeText from '@/utils/CodePre/CodeText'
import CodeTsx from '@/utils/CodePre/CodeTsx'
import { Typography } from 'antd'
import React from 'react'

const { Title, Paragraph } = Typography

const myExample: React.FC = () => {
  return (
    <Typography>
        <Paragraph>
          此樣板 為 主頁面的 範例結構，包含以下內容： <br/>
          1. 使用 useEffect 進行 頁面初始化 的行為設定。 <br/>
          2. 使用 PageContainer 作為 頁面容器，以便自動根據 菜單 顯示 麵包屑導航。 <br/>
          3. 使用 ProForm 作為 表單容器，並透過 formRef 來控制表單行為。 <br/>
          4. 浮層功能區 透過 FloatButton.Group 實現，包含 回頂部 和 到底部 的按鈕 (依需求新增)。 <br/>
          5. 底部功能區 透過 FooterToolbar 實現，放置主要操作按鈕。
        </Paragraph>

      <CodeTsx code={`import { AppstoreOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
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

        {/* 底部功能區 */}
        <FooterToolbar>
          <Button type='primary'>功能按鈕</Button>
        </FooterToolbar>
      </ProForm>
    </PageContainer>
  )
}

export default observer(myExample)
`}
      />
    </Typography>
  )
}

export default myExample
