
import React, { useEffect, useRef } from 'react'
import ProForm, { ProFormInstance, ProFormSwitch } from '@ant-design/pro-form'
import { MliFormRow } from '@mli-csmo/base'
import { log } from 'console'
import { debounce } from 'lodash'
import { FooterToolbar, PageContainer } from '@ant-design/pro-components'
import { Button, message } from 'antd'

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
          <ProFormSwitch
            name='status'
            label='啟用狀態'
            fieldProps={{
              checkedChildren: '開啟',
              unCheckedChildren: '關閉'
            }}
          />
        </MliFormRow>
      </ProForm>
    </PageContainer>
  )
}

export default MyForm
