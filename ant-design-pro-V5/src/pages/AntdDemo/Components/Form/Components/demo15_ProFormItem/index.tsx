import { MliFormCol, MliFormRow } from '@mli-csmo/base'
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, Input, InputNumber, List, message, Space, Typography } from 'antd'
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
      <Typography.Title level={3}>ProForm.Item</Typography.Title>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
      >
        <MliFormRow>
          {/* 案例 1 */}
          <MliFormCol colSize={2}>
            <ProForm.Item label="住所地址(緊湊模式)" required>
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
          {/* 案例 2 */}
          <MliFormCol colSize={2}>
            <ProForm.Item label="比例" required>
              <Space.Compact>
                <ProForm.Item
                  name="numerator"
                  noStyle
                  rules={[{ required: true, message: '請輸入分子' }]}
                >
                  <InputNumber placeholder="分子" />
                </ProForm.Item>
                <Input
                  readOnly
                  value="/"
                  style={{ width: 30 }}
                />
                <ProForm.Item
                  name="denominator"
                  noStyle
                  rules={[{ required: true, message: '請輸入分母' }]}
                >
                  <InputNumber placeholder="分母" />
                </ProForm.Item>
              </Space.Compact>
            </ProForm.Item>
          </MliFormCol>
          <List
            size="small"
            dataSource={[
              "1. 當元件有多個輸入欄位，但僅需要一個 title，可以透過 ProForm.Item 來將進行封裝。",
              "2. 外層 使用 一個 ProForm.Item 搭配 label 和 required 屬性 來設定 元件標題 與 必填指示。",
              "　內層 使用 多個 ProForm.Item 搭配 Antd 元件 來定義 輸入欄位 與 規則，並搭配 Space.Compact(緊湊模式) 來進行排版，讓欄位可以黏再一起。",
              "3. 因為 內部欄位 不需要 title，所以 內部不會使用 ProForm 封裝的元件(如：ProFormText)，而是使用 ProForm.Item 在封裝一般的 Antd元件(如：Input)。",
              "4. 如果需要顯示 必填欄位的 * ，要在 最外層的 ProForm.Item 加上 required，但是 必填檢核 要放在 裡面各自輸入欄位進行設定。"
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />

        </MliFormRow>
      </ProForm>
    </>
  )
}

export default MyForm
