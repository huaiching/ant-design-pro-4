import { MliFormCol, MliFormRow } from '@mli-csmo/base'
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, Input, message, Space, Typography } from 'antd'
import React, { useRef } from 'react'

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
              formRef.current?.validateFields().then((values) => {
                console.info(formRef.current?.getFieldsValue())
                message.success(`表單提交成功！${JSON.stringify(values)}`)
              })
            }}
            key='save'
          >
            確認
          </Button>
          <Button
            onClick={async () => {
              message.warning('取消作業')
            }}
          >
            取消
          </Button>
        </FooterToolbar>
      )
    }
  }

  const vaildatorEmail = (rule: any, value: any) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!re.test(value)) {
      return Promise.reject('不符合規範!!')
    }
    return Promise.resolve()
  }

  return (
    <>
      <Typography.Title level={3}>ProFormText</Typography.Title>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
      >
        <MliFormRow>
          {/* 案例 1 */}
          <MliFormCol colSize={1}>
            <ProFormText
              name='email'
              label='電子郵件'
              tooltip='這是用戶電子郵件'
              placeholder='請輸入電子郵件'
              rules={[
                { required: true, message: '必填' },
                // { validator: vaildatorEmail },
                { required: true, type: 'email' }
              ]}
              fieldProps={{ maxLength: 72 }}
            />
          </MliFormCol>
          {/* 案例 2 */}
          <MliFormCol colSize={1}>
            <ProForm.Item label="住所地址(緊湊模式)" style={{ marginBottom: 0 }}>
              <Space.Compact style={{ width: '100%' }}>
                <ProForm.Item
                  name="zipCode"
                  noStyle
                  rules={[{ required: true, message: '請輸入郵遞區號' }]}
                >
                  <Input placeholder="郵遞區號" style={{ flex: 1 }} />
                </ProForm.Item>
                <ProForm.Item
                  name="address"
                  noStyle
                  rules={[{ required: true, message: '請輸入地址' }]}
                >
                  <Input placeholder="地址" style={{ flex: 3 }} />
                </ProForm.Item>
              </Space.Compact>
            </ProForm.Item>
          </MliFormCol>

        </MliFormRow>
      </ProForm>
    </>
  )
}

export default MyForm
