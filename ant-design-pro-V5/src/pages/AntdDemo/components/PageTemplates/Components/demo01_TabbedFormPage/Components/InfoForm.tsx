import React from 'react'
import { Card, Descriptions, DescriptionsProps } from 'antd'
import { ProCard, ProFormInstance } from '@ant-design/pro-components'

interface Props {
  formRef: React.RefObject<ProFormInstance | undefined>
}

const infoData = {
  userName: '王小明',
  userId: 'T0001',
  address: '台北市內湖區石潭路58號1樓'
}

const InfoForm: React.FC<Props> = ({ formRef }) => {
  
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
        // title="基本資料"     // 整體區塊標題
        column={2}          // 一列顯示兩個欄位
        items={items}       // 欄位資料來源
        layout='horizontal' // 排列方式: horizontal.水平(預設) / vertical.垂直
    />    
  )
}

export default InfoForm
