
import React, { useRef } from 'react'
import ProForm, { ProFormInstance, ProFormUploadButton } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, message } from 'antd'
import MliFormRow from '@/common/components/form/MliFormRow'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  // 控制送出後之動作
  const submitterRender = () => {
    return {
      render: () => (
        <FooterToolbar>
            <Button
              type='primary'
              onClick={async () => {
                formRef.current?.validateFields().then(values => {
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
              }}
            >
              取消
            </Button>
        </FooterToolbar>
      )
    }
  }

  return (
    <>
      <h1>ProFormUploadButton</h1>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
      >
        <MliFormRow>
          <ProFormUploadButton
            name='file'
            label='上傳文件'
            title='上傳'
            fieldProps={{
              maxCount: 1,       // 最多只能上傳一個文件
            }}
            rules={[{ required: true, message: '請上傳文件' }]} // 校驗規則，要求文件必須上傳
          />
        </MliFormRow>
      </ProForm>
    </>
  )
}

export default MyForm
