/**
 * 第一個頁簽 - 示範 ProForm 輸入資料
 * 如果需要使用 formRef 的函式，可以透過 formRefStore.getFormRef 取得變數
 * 如果 僅需要塞值，可以不用將 formRef 引入
 */

import React, { useEffect } from 'react'
import { ProFormText } from '@ant-design/pro-components'
import { observer } from 'mobx-react'
import formRefStore from '../../Mobx/formRefStore'
import { message } from 'antd'
import tabRefStore from '../../Mobx/tabRefStore'

const TabContent1: React.FC = () => {
  const formRef = formRefStore.getFormRef

  useEffect(() => {
    // 註冊 tab1 的切換前事件，做表單驗證
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
  }, [])

  return (
    <>
      <ProFormText
        name={['tab1', 'addrss']}
        label='地址'
        rules={[{ required: true }]} />
      <ProFormText
        name={['tab1', 'phone']}
        label='電話'
        rules={[{ required: true }]} />
      <div style={{ height: '1000px' }}>長內容區域...</div>
    </>
  )
}

export default observer(TabContent1)
