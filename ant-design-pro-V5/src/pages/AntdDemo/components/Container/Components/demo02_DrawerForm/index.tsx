
import { MliFormRow } from '@/common'
import { DrawerForm, ProFormInstance, ProFormText } from '@ant-design/pro-form'
import { Button, message, Space } from 'antd'
import React, { useRef, useState } from 'react'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  // 管理 DrawerForm 的開關狀態
  const [visible, setVisible] = useState(false)

  // 控制送出後之動作
  const submitterRender = () => {
    return {
      render: () => (
        <Space>
            <Button
              type='primary'
              onClick={async () => {
                formRef.current?.validateFields().then(() => {
                  // 確認按鈕 點擊後 要進行的 API 操作
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
                  setVisible(false) // 提交後關閉彈窗
              }}
            >
              取消
            </Button>
        </Space>
      )
    }
  }

  return (
    <>
      <h1>DrawerForm</h1>
      <Button type='primary' onClick={() => setVisible(true)}>
        打開表單
      </Button>
      <DrawerForm
        grid
        layout='vertical'
        formRef={formRef}
        onVisibleChange={setVisible}
        visible={visible}
        drawerProps={{
          maskClosable: false
        }}
        submitter={submitterRender()}
      >
        <MliFormRow>
          <ProFormText
            name='username'
            label='用戶名稱'
            tooltip='這是用戶名稱'
            placeholder='請輸入用戶名稱'
            colSize={1}
            rules={[
              {
                  required: true,
                  message: '用戶名稱為必填項'
              }
            ]}
            fieldProps={{
                maxLength: 20
            }}
          />
        </MliFormRow>
      </DrawerForm>
    </>
  )
}

export default MyForm
