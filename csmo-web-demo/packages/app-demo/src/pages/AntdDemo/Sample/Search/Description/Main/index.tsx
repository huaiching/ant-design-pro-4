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

      <Paragraph>
        查詢頁面 的主要功能是 顯示查詢結果列表，藉由 <code>ProTable</code> 進行資料呈現，並 透過 下述兩種方法 來實現與 API 的對接 ： <br />
        1. request 屬性：ProTable 的 API 對接方法，可進行 ProTable 內建的複雜操作，如：分頁查詢 (Page API)。 <br />
        2. dataSource 屬性：手動設定資料數據，需配合 useEffect 來實現 API 的對接，適用於需要在頁面載入時就取得資料，或者需要進行一些額外的資料處理的情況。 <br />
        這兩種方法 各有優缺點，選擇哪一種方法 取決於你的具體需求和情況，但 若無特殊需求，建議使用 ProTable 的 request 屬性 來實現 API 的對接，因為這樣可以更好地利用 ProTable 的功能和優化。
      </Paragraph>

      <Paragraph type='warning'>
        雖然 範例 還是保留 initData 和 readData 兩個方法，但實際上，對於 查詢頁面來說，通常不需要 這兩個方法。 <br />
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
