import CodeTsx from '@/utils/CodePre/CodeTsx'
import { PageContainer } from '@ant-design/pro-components'
import { Typography } from 'antd'
import React from 'react'

const { Title, Paragraph } = Typography

const SampleSearch: React.FC = () => {
  return (
    <PageContainer>
      <Typography>
        <Paragraph>
          此樣板 為 一般頁面的 範例結構，包含以下內容： <br />
          1. 使用 useEffect 進行 頁面初始化 的行為設定。 <br />
          2. 使用 PageContainer 作為 頁面容器，以便自動根據 菜單 顯示 麵包屑導航。 <br />
          3. 使用 ProForm 作為 表單容器，並透過 formRef 來控制表單行為。 <br />
          4. 頁面內容區域，實際的頁面內容由 子頁面 來實現。 <br />
          5. 浮層功能區 透過 FloatButton.Group 實現，包含 回頂部 和 到底部 的按鈕 (依需求新增)。 <br />
          6. 底部功能區 透過 FooterToolbar 實現，放置主要操作按鈕。
        </Paragraph>

        <Paragraph type='warning'>
          建議 此頁面負責 <code>頁面的布局結構設定</code>、<code>資料初始化設定</code> 等 頁面的共通行為，實際的頁面內容、功能邏輯等，則由 子頁面 來實現。
        </Paragraph>

        <Paragraph type='danger'>
          僅為 程式基本結構，實際使用 請參考 <code>元件範例</code> 來進行開發，並根據實際需求進行調整。
        </Paragraph>

        <CodeTsx code={`import { AppstoreOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer, ProForm, ProFormInstance } from '@ant-design/pro-components'
import { Button, FloatButton, Spin } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react'

/**
 * 一般 的 頁面結構範例
 */
const SampleMain: React.FC = () => {
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
          <div>頁面內容</div>

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
      </Spin>
    </PageContainer>
  )
}

export default observer(SampleMain)`}
        />
      </Typography>
    </PageContainer>
  )
}

export default SampleSearch
