
import React, { useRef, useState } from 'react'
import ProForm, { ProFormCheckbox, ProFormInstance } from '@ant-design/pro-form'
import { MliFormRow } from '@mli-csmo/base'
import { Input, Typography } from 'antd'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const [otherValue, setOtherValue] = useState('')

  const options = [
    { label: '讀書', value: 'reading' },
    { label: '旅行', value: 'travelling' },
    { label: '運動', value: 'sports' },
    { // 「其他」選項，內部嵌入一個 Input
      label: (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          其他
          <Input
            placeholder=""
            style={{ width: 150, marginLeft: 8 }}
            value={otherValue}
            onChange={(e) => setOtherValue(e.target.value)}  // 更新狀態
            onClick={(e) => e.stopPropagation()}
            /*
              阻止事件冒泡到父層 Checkbox.Group
              目的：
              - 點擊 input 時只聚焦，不觸發 checkbox 勾選/取消
              - 如果移除，點擊 input 可能會誤觸勾選「其他」
            */
          />
        </span>
      ),
      value: 'other',
    },
  ]

  return (
    <>
      <h1>ProFormCheckbox.Group</h1>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={false}
      >
        <MliFormRow>
          <ProFormCheckbox.Group
            colSize={2}
            name='hobbies'
            label='選擇興趣'
            options={options}
            rules={[
              { required: true, message: '請選擇至少一個興趣' }
            ]}
          />
        </MliFormRow>
        <Typography.Text type='danger'>
          其他 後面使用的 Input 是另外保存的，範例是使用 useState，但實際上可以改成 Mobx 方便後續抓取。
        </Typography.Text>
      </ProForm>
    </>
  )
}

export default MyForm
