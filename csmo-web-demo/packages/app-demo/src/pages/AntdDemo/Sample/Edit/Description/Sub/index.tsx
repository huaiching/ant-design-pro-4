import CodeTsx from '@/utils/CodePre/CodeTsx'
import { Typography } from 'antd'
import React from 'react'

const { Title, Paragraph } = Typography

const SampleSub: React.FC = () => {
  return (
    <Typography>
      <Paragraph>
        此樣板 為 子頁面的 範例結構，包含以下內容： <br />
        1. 使用 ProForm 作為 表單容器，並透過 formRef 來控制表單行為。 <br />
        2. 使用 useEffect 進行 頁面初始化 的行為設定。 <br />
        3. 使用 useEffect 監聽 Mobx Store 中的資料變更，並將資料帶入表單。 <br />
        4. 透過 readData 方法來管理頁籤初次載入時，將 Mobx Store 中的資料帶入表單。 <br />
        5. 透過 handleValueChange 方法來處理表單值變更的行為，並同步更新 Mobx Store 中的資料。
      </Paragraph>

      <Paragraph type='warning'>
        子流程頁面，負責 頁面實際內容的呈現。<br />
        由於是透過 Mobx 進行資料管理，因此 需要進行 資料同步作業：<br />
        1. 頁籤初次載入時，將 Mobx Store 中的資料帶入表單。 <br />
        2. 表單值變更時，透過 handleValueChange 方法。同步更新 Mobx Store 中的資料。 <br />
        請確保在適當的時機點進行資料同步，以確保資料的正確性和一致性。
      </Paragraph>

      <Paragraph type='danger'>
        僅為 程式基本結構，實際使用 請參考 <code>元件範例</code> 來進行開發，並根據實際需求進行調整。
      </Paragraph>

      <CodeTsx title='SubEdit.tsx' code={`import { ProForm, ProFormInstance, ProFormText } from "@ant-design/pro-components"
import { observer } from "mobx-react"
import { useEffect, useRef } from "react"
import subEditStore from "../Mobx/SubEditStroe"
import { MliFormRow } from "@mli-csmo/base"

const SubEdit: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  // 初始載入時的設定
  useEffect(() => {
    // 讀取資料
    readData()

    // 離開頁面前的處理
    return () => {
      // 離開頁面前先將資料塞回 mobx
      handleValueChange()
    }
  }, []);

  // mobx 資料異動時的處理
  useEffect(() => {
    // 當 mobx 的資料變更時，將資料帶入表單
    readData()
  }, [subEditStore.getData]);

  // 頁籤初次載入時，將 mobx 的資料帶入
  const readData = () => {
    const data = subEditStore.getData
    formRef.current?.setFieldsValue(data)
  }

  // 表單值變更處理: 同步更新 Mobx 資料
  const handleValueChange = () => {
    const values = formRef.current?.getFieldsValue()
    subEditStore.setData(values)
  }

  return (
    <ProForm
      formRef={formRef} submitter={false} layout="vertical"
      onValuesChange={handleValueChange}
    >
      {/* 頁面內容，依照實際需求進行調整 */}
      <MliFormRow>
        <ProFormText
          name='sampleText'
          label='示範輸入'
        />
      </MliFormRow>
    </ProForm>
  )
}

export default observer(SubEdit)`}
      />
    </Typography>
  )
}

export default SampleSub
