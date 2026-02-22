import ProForm, { ProFormInstance, ProFormRadio } from '@ant-design/pro-form'
import { MliFormRow } from '@mli-csmo/base'
import { Button, Input, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { log } from 'console'
import { debounce } from 'lodash'
import { FooterToolbar, PageContainer } from '@ant-design/pro-components'

// 模擬數據
let data = {}

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  useEffect(() => {
    // 預設帶入表單資料
    formRef.current?.setFieldsValue({
      ...data,
    })
  }, [])

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

  // 控制送出後之動作
  const submitterRender = () => {
    return {
      render: () => (
        <FooterToolbar>
          <Button
            type='primary'
            onClick={async () => {
              log('表單數據', data)
              formRef.current?.validateFields().then(() => {
                message.success('表單提交成功！')
              })
            }}
            key='save'
          >
            確認
          </Button>
          <Button
            onClick={async () => {
              // 取消按鈕 點擊後 要進行的 API 操作
              message.warning('取消作業')
            }}
          >
            取消
          </Button>
        </FooterToolbar>
      )
    }
  }

  // 表單值變更處理，使用 debounce 限制觸發頻率
  const handleValueChange = debounce(() => {
    // 取得表單變更資料
    const values = formRef.current?.getFieldsValue()
    data = {
      ...values
    }
  }, 300)

  return (
    <PageContainer>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
        onValuesChange={handleValueChange}
      >
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
    </PageContainer>
  )
}

export default MyForm
