import CodeTsx from '@/utils/CodePre/CodeTsx'
import { Typography } from 'antd'
import React from 'react'

const { Title, Paragraph } = Typography

const SampleMobx: React.FC = () => {
  return (
    <Typography>
      <Paragraph>
        此樣板 為 Mobx的 範例結構，包含以下內容： <br />
        1. 定義 Mobx Store 來管理資料狀態，包含資料變數、初始化方法、讀取資料方法、更新資料方法等。 <br />
        2. 在子頁面中使用 useEffect 來進行資料的初始化和讀取，並在表單值變更時同步更新 Mobx Store 中的資料。 <br />
        3. 在主頁面中呼叫子頁面的 Mobx Store 的方法來進行資料的初始化和讀取。 <br />
      </Paragraph>

      <Paragraph type='warning'>
        Mobx 的用途是 編輯欄位的全域資料管理，請根據實際需求的欄位，來定義資料變數、初始化方法、讀取資料方法、更新資料方法等，並在子頁面中使用 useEffect 來進行資料的初始化和讀取，確保資料的正確性和一致性。
      </Paragraph>

      <Paragraph type='danger'>
        <code>readData</code> 方法中的資料讀取，實際上應該是透過 API 來取得後端資料，這邊先寫死一筆資料來示範結構，請根據實際需求來實現資料的讀取邏輯。
      </Paragraph>

      <CodeTsx title='SubEditStroe.ts' code={`/**
 * 資料變數
 */

import { makeAutoObservable } from "mobx"

// 定義保單資料型別
export interface props {
  sampleText: string    // 示範輸入
}

class SubEditStore {
  data: props = {
    sampleText: ''
  }

  constructor() {
    makeAutoObservable(this)
  }

  // 資料初始化: 主頁面 初次載入時，執行此方法來清空資料
  init() {
    this.data = {
      sampleText: ''
    }
  }

  // 從 API 讀取資料: 主頁面 初次載入時，執行此方法來讀取資料
  readData() {
    // 這邊先寫死，實際上要 透過 API 抓取後端資料
    const data = {
      sampleText: '示範輸入'
    }
    this.data = data
  }

  setData(data: props) {
    this.data = data
  }

  get getData() {
    return this.data
  }

}
const subEditStore = new SubEditStore()
export default subEditStore
`}
      />
    </Typography>
  )
}

export default SampleMobx
