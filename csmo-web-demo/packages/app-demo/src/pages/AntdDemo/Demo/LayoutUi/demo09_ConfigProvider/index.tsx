import { MliFormRow } from '@mli-csmo/base'
import ProForm, { ProFormDigit, ProFormInstance, ProFormText, ProFormSelect } from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { Button, ConfigProvider, List, message, Modal, Space, Switch, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const [disabled, setDisabled] = useState<boolean>(false)

  // 初始載入時的設定
  useEffect(() => {
    // 讀取資料
    // ...

    // 離開頁面前的處理
    return () => {
      // 離開頁面前先將資料塞回 mobx
      handleValueChange()
    }
  }, []);

  // 表單值變更處理: 同步更新 Mobx 資料
  const handleValueChange = () => {
    const values = formRef.current?.getFieldsValue()
    // 呼叫 Mobx 的 setting
  }

  // 控制送出後之動作
  const submitterRender = () => {
    Modal.confirm({
      content: "確定要送出嗎？",
      onOk() {
        formRef.current?.validateFields().then(() => {
          const formRefData = formRef.current?.getFieldsValue()
          console.log('表單數據', formRefData);

          message.success('表單提交成功！')
        })
      },
      onCancel() {
        // 取消按鈕 點擊後 要進行的 API 操作
        message.warning('取消作業')
      }
    })
  }

  return (
    <PageContainer
      header={{
        ghost: true
      }}
    >
      <ProForm submitter={false} layout="vertical">
        {/* 表單禁用狀態切換 */}
        <Space style={{ marginBottom: 16 }}>
          <Switch
            checked={disabled}
            onChange={(checked) => setDisabled(checked)}
            checkedChildren="表單禁用"
            unCheckedChildren="表單啟用"
          />
          <Typography.Text>控制表單禁用狀態（部分功能始終啟用）</Typography.Text>
        </Space>

        <ConfigProvider componentDisabled={disabled}>
          <ProForm
            grid
            layout="vertical"
            formRef={formRef}
            submitter={false}
          >
            <MliFormRow>
              <ProFormText
                name="email"
                label="電子郵件"
                tooltip="這是用戶電子郵件"
                placeholder="請輸入電子郵件"
                rules={[
                  { required: true, message: '請輸入電子郵件' },
                  { type: 'email', message: '請輸入有效的電子郵件格式' },
                ]}
              />
              <ProFormDigit
                name="amt"
                label="工本費"
                tooltip="這是收據的工本費"
                placeholder="請輸入工本費"
                fieldProps={{
                  max: 100,
                  min: 0,
                  step: 0.01,
                  precision: 2,
                }}
                rules={[{ required: true, message: '請輸入工本費' }]}
              />
              <ProFormSelect
                name="role"
                label="用戶角色"
                tooltip="選擇用戶的角色"
                placeholder="請選擇角色"
                options={[
                  { label: '管理員', value: 'admin' },
                  { label: '普通用戶', value: 'user' },
                  { label: '訪客', value: 'guest' },
                ]}
                rules={[{ required: true, message: '請選擇角色' }]}
              />
              <ProFormText
                name="note"
                label="備註"
                colSize={2}
                tooltip="可選填的備註資訊（始終啟用）"
                placeholder="請輸入備註"
                disabled={false} // 備註欄位始終啟用
              />
            </MliFormRow>

            <MliFormRow>
              <ProFormText
                name="contactName"
                label="聯絡人姓名"
                tooltip="這是聯絡人的姓名"
                placeholder="請輸入聯絡人姓名"
                rules={[{ required: true, message: '請輸入聯絡人姓名' }]}
              />
              <ProFormText
                name="phone"
                label="聯絡電話"
                tooltip="這是聯絡人的電話號碼"
                placeholder="請輸入電話號碼"
                rules={[
                  { required: true, message: '請輸入電話號碼' },
                  { pattern: /^\d{10}$/, message: '電話號碼必須為10位數字' },
                ]}
              />
              <ProFormSelect
                name="department"
                label="部門"
                tooltip="選擇聯絡人所在的部門"
                placeholder="請選擇部門"
                options={[
                  { label: '技術部', value: 'tech' },
                  { label: '市場部', value: 'marketing' },
                  { label: '財務部', value: 'finance' },
                ]}
                rules={[{ required: true, message: '請選擇部門' }]}
              />
              <ProFormText
                name="comment"
                label="備註"
                colSize={2}
                tooltip="可選填的備註資訊"
                placeholder="請輸入備註"
              />
            </MliFormRow>
          </ProForm>
          <List
            size="small"
            dataSource={[
              '相關元件放在 ConfigProvider componentDisabled={disabled} 中',
              'disabled = true 會將裡面的全部元件設定為 不可編輯',
              '如果 某個元件 不要禁用，要設定屬性 disabled = false'
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </ConfigProvider>

        {/* 底部功能區 */}
        <FooterToolbar>
          <Button type='primary' onClick={submitterRender}>送出</Button>
        </FooterToolbar>
      </ProForm>
    </PageContainer >
  )
}

export default MyForm