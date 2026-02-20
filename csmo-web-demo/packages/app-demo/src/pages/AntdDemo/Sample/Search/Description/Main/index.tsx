import CodeTsx from '@/utils/CodePre/CodeTsx'
import { Typography } from 'antd'
import React from 'react'

const { Title, Paragraph } = Typography

const SampleMain: React.FC = () => {
  return (
    <Typography>
      <Paragraph>
        查詢 通常只會有一塊主要的內容區塊，負責 顯示查詢結果 的列表資料，因此在頁面結構上，會相對簡單。 <br />
        這邊 為了讓結構更清楚，將 查詢結果列表 的內容，獨立成一個子頁面，實際上，也可以直接在 主頁面 中 實現 查詢結果列表 的內容，這部分 可以根據實際需求來進行調整。
      </Paragraph>

      <Paragraph type='warning'>
        雖然 範例 還是保留 initData 和 readData 兩個方法，但實際上，對於 查詢頁面來說，通常不需要 這兩個方法。 <br />
        因為 查詢頁面 的主要功能是 顯示查詢結果列表，這部分的資料通常是透過 ProTable 的 request 屬性來實現與 API 的對接，因此不需要額外的 資料初始化 或 讀取方法。 <br />
        如果 你需要的不是一般的 查詢頁面，而是需要在頁面載入時就顯示一些特定的資料，或者需要在頁面載入時進行一些特定的操作，那麼你可以根據實際需求來決定是否需要這兩個方法。
      </Paragraph>

      <Paragraph type='danger'>
        僅為 程式基本結構，實際使用 請參考 <code>元件範例</code> 來進行開發，並根據實際需求進行調整。
      </Paragraph>

      <CodeTsx title='index.tsx' code={`import { AppstoreOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { PageContainer, ProForm, ProFormInstance } from '@ant-design/pro-components'
import { FloatButton, Spin } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react'
import Search from './Components/Search';

/**
 * 頁面結構範例
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

export default observer(SampleSearch)`}
      />
    </Typography>
  )
}

export default SampleMain
