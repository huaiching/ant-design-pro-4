import { MliFormCol, MliFormRow } from '@mli-csmo/base'
import ProForm, { ProFormText } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, Input, message, Space, Typography } from 'antd'
import React from 'react'
import { isGuiNumberValid, isNationalIdentificationNumberValid, isResidentCertificateNumberValid } from 'taiwan-id-validator'
import SearchReceiveNo from './Components/SearchReceiveNo'
import formStore from './Mobx/formRefStore'

const MyForm: React.FC = () => {
  // const formRef = useRef<ProFormInstance>()
  const formRef = formStore.getFormRef

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

  const checkClientId = (rule: any, value: any) => {
    // 檢查 中華民國身分證字號
    if (isNationalIdentificationNumberValid(value)) {
      return Promise.resolve()
    }
    // 檢查 統一編號
    if (isGuiNumberValid(value)) {
      return Promise.resolve()
    }
    // 檢查 居留證編號
    if (isResidentCertificateNumberValid(value)) {
      return Promise.resolve()
    }

    return Promise.reject('身分證字號格式錯誤')
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
          <ProFormText
            name='email'
            label='電子郵件'
            tooltip='這是用戶電子郵件'
            placeholder='請輸入電子郵件'
            rules={[
              { required: true, message: '必填' },
              { required: true, type: 'email' }
            ]}
            fieldProps={{ maxLength: 72 }}
          />
          {/* 案例 2 */}
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
        </MliFormRow>

        <MliFormRow>
          {/* 案例 3 */}
          <ProFormText
            name="clientId"
            label="客戶證號"
            tooltip='僅能輸入英數'
            placeholder=""
            rules={[
              { required: true, message: '必填' },
              { validator: checkClientId }
            ]}
            fieldProps={{
              maxLength: 10,
              onChange: (e) => {
                // 輸入文字轉換: 只允許輸入英數字，並強制轉大寫
                const upper = e.target.value
                  .replace(/[^a-zA-Z0-9]/g, '') // 只允許輸入英數字
                  .toUpperCase()  // 強制轉大寫
                // 更新數值
                formRef?.current?.setFieldValue('clientId', upper)
              },
            }}
          />
          {/* 案例4 */}
          <SearchReceiveNo />
        </MliFormRow>
      </ProForm>
    </>
  )
}

export default MyForm
