/**
 * info 顯示基本資料 的頁面
 * 所有資料 透過 mobx 的 basicStore 取得 (於 第一頁 設定)
 */

import React from 'react'
import { Descriptions, DescriptionsProps } from 'antd'
import { observer } from 'mobx-react'
import basicStore from '../../Mobx/basicStore'
import optionsStore from '../../Mobx/optionStore'

const InfoForm: React.FC = () => {
  const basicData = basicStore.getBasic
  const chgTypeOption = optionsStore.getOptions('chgType')

  const items: DescriptionsProps['items'] = [
    {
      key: 'policyNo',
      label: '保單號碼',
      children: basicData.policyNo,
      // labelStyle: { minWidth: 120 },
      contentStyle: { minWidth: 100 },
      span: 1
    },
    {
      key: 'receiveNo',
      label: '受理號碼',
      children: basicData.receiveNo,
      // labelStyle: { minWidth: 120 },
      contentStyle: { minWidth: 100 },
      span: 1
    },
    {
      key: 'receiveDate',
      label: '受理日期',
      children: basicData.receiveDate,
      // labelStyle: { minWidth: 120 },
      contentStyle: { minWidth: 100 },
      span: 1
    },
    {
      key: 'chgDate',
      label: '變更生效日',
      children: basicData.chgDate,
      // labelStyle: { minWidth: 120 },
      contentStyle: { minWidth: 100 },
      span: 1
    },
    {
      key: 'chgType',
      label: '變更選項',
      children: chgTypeOption.find((option) => option.value === basicData.chgType)?.label || '',
      // labelStyle: { minWidth: 120 },
      contentStyle: { minWidth: 100 },
      span: 1
    }
  ]

  return (
    <Descriptions
        // title='基本資料'  // 整體區塊標題
        column={5}          // 一列顯示兩個欄位
        items={items}       // 欄位資料來源
        layout='horizontal' // 排列方式: horizontal.水平(預設) / vertical.垂直
        size='small'        // 行距
        bordered            // 顯示邊框
    />
  )
}

export default observer(InfoForm)
