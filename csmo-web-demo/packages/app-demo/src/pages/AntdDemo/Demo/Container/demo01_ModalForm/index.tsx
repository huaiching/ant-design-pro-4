import { MliFormRow } from '@mli-csmo/base'
import ProForm, { ModalForm, ProFormInstance, ProFormText } from '@ant-design/pro-form'
import { Button, message, Space } from 'antd'
import React, { useRef, useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  // 管理 ModelForm 的開關狀態
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
    <PageContainer
      header={{
        ghost: true
      }}
    >
      <ProForm formRef={formRef} submitter={false} layout="vertical">
        <Button type='primary' onClick={() => setVisible(true)}>
          打開表單
        </Button>
        <ModalForm
          grid
          layout='vertical'
          formRef={formRef}
          onOpenChange={setVisible}   // 控制 Modal 開啟/關閉狀態的回調
          open={visible}              // Modal 開啟/關閉的綁定狀態
          modalProps={{
            closable: false,          // 關閉右上角 X 按鈕
            maskClosable: false,      // 禁止點擊遮罩關閉
            width: '90%',             // 設定寬度
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
        </ModalForm>
      </ProForm>
    </PageContainer>
  )
}

export default MyForm
