import React from 'react'
import { Descriptions, DescriptionsProps } from 'antd'
import formStore from '../Mobx/FormStore'
import { observer } from 'mobx-react'

const infoData = {
  userName: '',
  userId: '',
  address: ''
}

const InfoForm: React.FC = () => {
  const formRef = formStore.getFormRef
  
  const items: DescriptionsProps['items'] = [
    {
      key: 'userName',
      label: '姓名',
      children: infoData.userName,
      span: 1,
    },
    {
      key: 'userId',
      label: '證號',
      children: infoData.userId,
      span: 1,
    },
    {
      key: 'address',
      label: '聯絡地址',
      children: infoData.address,
      span: 2,
    },
  ]

  return (
    <Descriptions
        // title='基本資料'     // 整體區塊標題
        column={2}          // 一列顯示兩個欄位
        items={items}       // 欄位資料來源
        layout='horizontal' // 排列方式: horizontal.水平(預設) / vertical.垂直
    />    
  )
}

export default observer(InfoForm)