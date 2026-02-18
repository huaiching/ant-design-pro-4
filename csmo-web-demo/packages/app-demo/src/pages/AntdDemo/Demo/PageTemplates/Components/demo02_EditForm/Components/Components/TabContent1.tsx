/**
 * 第一個頁簽 - 示範 ProForm 輸入資料
 * 如果需要使用 formRef 的函式，可以透過 formRefStore.getFormRef 取得變數
 * 如果 僅需要塞值，可以不用將 formRef 引入
 */

import React, { useEffect, useRef } from 'react'
import { ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components'
import { observer } from 'mobx-react'
import { message } from 'antd'
import tabRefStore from '../../Mobx/tabRefStore'
import tab1Store from '../../Mobx/tab1Store'

const TabContent1: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const tab1Data = tab1Store.getTab1

  useEffect(() => {
    // 註冊 頁簽 的切換前事件，做表單驗證
    tabRefStore.setTabLeaveFn('tab1', async () => {
      message.info('Tab1 切換')
      const valid = await formRef.current?.validateFields()
      if (valid) {
        return true
      } else {
        message.error('Tab1 欄位未完成')
        return false
      }
    })
    // 👉 註冊進入頁籤事件
    tabRefStore.setTabEnterFn('tab1', () => {
      message.info('進入 Tab1')
    })
  }, [])

  // 頁籤初次載入時，將 mainForm 的資料帶入
  useEffect(() => {
    formRef.current?.setFieldsValue(tab1Data)
  }, [])

  // 表單值變更處理，使用 debounce 限制觸發頻率
  const handleValueChange = () => {
    // 取得表單變更資料
    const values = formRef.current?.getFieldsValue()
    tab1Store.setTab1(values)
  }

  return (
    <ProForm
      formRef={formRef} submitter={false} layout="vertical"
      onValuesChange={handleValueChange}
    >
      <ProFormText
        name={'address'}
        label='地址'
        rules={[{ required: true }]} />
      <ProFormText
        name={'phone'}
        label='電話'
        rules={[{ required: true }]} />
      <div style={{ height: '1000px' }}>長內容區域...</div>
    </ProForm>
  )
}

export default observer(TabContent1)
