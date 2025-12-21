import { FooterToolbar } from '@ant-design/pro-components'
import ProForm, { ProFormCheckbox, ProFormInstance } from '@ant-design/pro-form'
import { MliFormRow } from '@mli-csmo/base'
import { Button, Input, message, Typography } from 'antd'
import { log } from 'console'
import { debounce } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'

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
  const [otherValue, setOtherValue] = useState('')
  const [otherDisabled, setOtherDisabled] = useState<boolean>(true)

  // 其他 有無勾選的判斷: 有勾選=開放可編輯其他說明；無勾選=關閉其他說明+清空其他說明
  const handleCheckboxChange = (list: string[]) => {
    if (!list.includes('4')) {
      setOtherDisabled(true)
      setOtherValue('')
    } else {
      setOtherDisabled(false)
    }
  }

  const options = [
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
            value={otherValue}
            placeholder="其他說明"
            onChange={(e) => setOtherValue(e.target.value)}
            disabled={otherDisabled}
          />
        </>
      ),
      value: '4'
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
    <>
      <h1>ProFormCheckbox.Group</h1>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
        onValuesChange={handleValueChange}
      >
        <MliFormRow>
          <ProFormCheckbox.Group
            colSize={2}
            name="hobbies"
            label="選擇興趣"
            options={options}
            rules={[{ required: true, message: '請選擇至少一個興趣' }]}
            fieldProps={{
              onChange: handleCheckboxChange // 透過 onChange 觸發 其他內容的控管函式
            }}
          />
        </MliFormRow>
        <Typography.Text type="danger">
          其他 後面使用的 Input 是另外保存的，範例是使用 useState，但實際上可以改成 Mobx
          方便後續抓取。
        </Typography.Text>
      </ProForm>
    </>
  )
}

export default MyForm
