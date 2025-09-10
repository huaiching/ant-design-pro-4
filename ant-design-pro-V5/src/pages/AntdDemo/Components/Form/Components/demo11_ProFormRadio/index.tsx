import ProForm, { ProFormInstance, ProFormRadio } from '@ant-design/pro-form'
import { MliFormRow } from '@mli-csmo/base'
import { Input } from 'antd'
import React, { useRef, useState } from 'react'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  // 使用 useState 來保存「其他」選項的輸入值
  // 1. 興趣 使用
  const [otherValue1, setOtherValue1] = useState('')
  const [otherDisabled1, setOtherDisabled1] = useState<boolean>(true)
  // 2. 狀態 使用
  const [otherValue2, setOtherValue2] = useState('')
  const [otherDisabled2, setOtherDisabled2] = useState<boolean>(true)

  // 其他 有無勾選的判斷: 有勾選=開放可編輯其他說明；無勾選=關閉其他說明+清空其他說明
  // 1. 興趣 使用
  const hobbiesChange = (e: any) => {
    const value = e.target.value
    if (value !== '4') {
      setOtherDisabled1(true)
      setOtherValue1('')
    } else {
      setOtherDisabled1(false)
    }
  }
  // 2. 狀態 使用
  const statusChange = (e: any) => {
    const value = e.target.value
    if (value !== '5') {
      setOtherDisabled2(true)
      setOtherValue2('')
    } else {
      setOtherDisabled2(false)
    }
  }

  const hobbiesOption = [
    { label: '讀書', value: '1' },
    { label: '旅行', value: '2' },
    { label: '運動', value: '3' },
    {
      label: (
        <>
          其他
          <Input
            variant="underlined"
            style={{ width: 150, marginLeft: 8 }}
            value={otherValue1}
            placeholder="其他說明"
            onChange={(e) => setOtherValue1(e.target.value)}
            disabled={otherDisabled1}
          />
        </>
      ),
      value: '4'
    }
  ]

  const statusOption = [
    { label: '分析', value: '1' },
    { label: '開發', value: '2' },
    { label: '測試', value: '3' },
    { label: '上線', value: '4' },
    {
      label: (
        <>
          其他
          <Input
            variant="borderless"
            style={{ width: 150, marginLeft: 8 }}
            value={otherValue2}
            placeholder="其他說明"
            onChange={(e) => setOtherValue2(e.target.value)}
            disabled={otherDisabled2}
          />
        </>
      ),
      value: '5'
    }
  ]

  return (
    <>
      <h1>ProFormRadio.Group</h1>
      <ProForm grid layout="vertical" formRef={formRef} submitter={false}>
        <MliFormRow>
          <Input placeholder="123" variant="borderless" />
          <ProFormRadio.Group
            name="hobbies"
            label="興趣"
            colSize={2}
            options={hobbiesOption}
            rules={[{ required: true, message: '不可空白' }]}
            fieldProps={{
              defaultValue: '1',
              onChange: hobbiesChange
            }}
          />
          <ProFormRadio.Group
            name="status"
            label="狀態"
            colSize={2}
            options={statusOption}
            rules={[{ required: true, message: '請選擇狀態' }]}
            fieldProps={{
              defaultValue: '1',
              onChange: statusChange, // 透過 onChange 觸發 其他內容的控管函式
              optionType: 'button',
              buttonStyle: 'solid'
            }}
          />
        </MliFormRow>
      </ProForm>
    </>
  )
}

export default MyForm
