
import React, { useSyncExternalStore } from 'react'
import { Card } from 'antd'
import { store } from '../Store/store'

const DisplayPage: React.FC = () => {
  // 核心：透過 useSyncExternalStore 訂閱外部狀態
  const data = useSyncExternalStore(store.subscribe, store.getSnapshot)

  return (
    <Card title="顯示資料頁">
      <p>目前資料：{data || '（尚未輸入資料）'}</p>
    </Card>
  )
}

export default DisplayPage
