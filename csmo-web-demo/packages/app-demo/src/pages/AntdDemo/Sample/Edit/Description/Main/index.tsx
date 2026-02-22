import CodeTsx from '@/utils/CodePre/CodeTsx'
import { Typography } from 'antd'
import React from 'react'

const { Title, Paragraph } = Typography

const SampleMain: React.FC = () => {
  return (
    <Typography>
      <Paragraph>
        此樣板 為 主頁面的 範例結構，包含以下內容： <br />
        1. 使用 useEffect 進行 頁面初始化 的行為設定。 <br />
        2. 使用 PageContainer 作為 頁面容器，以便自動根據 菜單 顯示 麵包屑導航。 <br />
        3. 使用 ProForm 作為 表單容器，並透過 formRef 來控制表單行為。 <br />
        4. 浮層功能區 透過 FloatButton.Group 實現，包含 回頂部 和 到底部 的按鈕 (依需求新增)。 <br />
        5. 底部功能區 透過 FooterToolbar 實現，放置主要操作按鈕。
      </Paragraph>

      <Paragraph type='warning'>
        主流程頁面，只負責 <code>頁面的布局結構設定</code>、<code>資料初始化設定</code> 等 頁面的共通行為，實際的頁面內容、功能邏輯等，則由 子頁面 來實現。<br />
        由於 編輯頁面 會透過 Mobx 進行資料管理，因此 主頁面 初次載入時，必須呼叫 子頁面 Mobx 的 init 方法 來進行資料初始化，並在需要讀取資料時呼叫 readData 方法 來取得資料。
      </Paragraph>

      <Paragraph type='warning'>
        為了確保 <code>從 API 讀取資料</code> 只會進行一次，建議將<code>從 API 讀取資料</code> 的行為，在 主頁面的初次載入時，執行此動作。
      </Paragraph>

      <Paragraph type='danger'>
        僅為 程式基本結構，實際使用 請參考 <code>元件範例</code> 來進行開發，並根據實際需求進行調整。
      </Paragraph>

      <CodeTsx title='index.tsx' code={`import { AppstoreOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer, ProForm, ProFormInstance } from '@ant-design/pro-components'
import { Button, FloatButton, Modal, Spin } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react'
import subEditStore from './Mobx/SubEditStroe';
import SubEdit from './Components/SubEdit';

/**
 * 主流程 的 頁面結構範例
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
    subEditStore.init()

  }

  const readData = () => {
    // 讀取資料: 如果需要呼叫 API 取得資料 就在這裡進行
    setLoading(true)
    subEditStore.readData()
    setLoading(false)
  }

  // 控制送出後之動作
  const submitterRender = () => {
    Modal.confirm({
      content: "確定要送出嗎？",
      onOk() {
        // 送出前的處理: 例如表單驗證
        formRef.current?.validateFields().then(() => {
          // 送出後的處理: 例如呼叫 API 儲存資料
          // 儲存成功後的處理: 例如顯示成功訊息、導頁等
        })
      },
      onCancel() {
        // 取消作業
      }
    })
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
          {/* 頁面內容 */}
          <SubEdit />

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
            <Button>功能按鈕</Button>
            <Button type='primary' onClick={submitterRender}>送出</Button>
          </FooterToolbar>
        </ProForm>
      </Spin>
    </PageContainer>
  )
}

export default observer(SampleMain)`}
      />
    </Typography>
  )
}

export default SampleMain
