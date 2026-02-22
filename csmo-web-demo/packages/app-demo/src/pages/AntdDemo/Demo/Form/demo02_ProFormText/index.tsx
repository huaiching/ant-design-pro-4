import { halfWidthProps, alnumProps, numProps, fullWidthProps, toUpperProps } from '@/utils/FieldUtil/StringUtil'
import { SearchOutlined } from '@ant-design/icons'
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { MliFormCol, MliFormRow } from '@mli-csmo/base'
import { Button, Input, message, Modal, Space, Tooltip, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import {
  isGuiNumberValid,
  isNationalIdentificationNumberValid,
  isResidentCertificateNumberValid
} from 'taiwan-id-validator'
import OptionReceiveNo from './Components/optionRecevieNo'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  // modal 開關
  const [showModal, setShowModal] = useState(false)
  
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

  /**
   * 身份證字號檢核: 使用 taiwan-id-validator
   * https://www.npmjs.com/package/taiwan-id-validator/v/1.5.0
   */
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
    <PageContainer>
      <ProForm
        grid
        layout="vertical"
        formRef={formRef}
        submitter={false}
        onValuesChange={handleValueChange}
      >
        <MliFormRow>
          {/* 案例 1 */}
          <ProFormText
            name="email"
            label="電子郵件"
            tooltip="這是用戶電子郵件"
            placeholder="請輸入電子郵件"
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
                  <Input
                    placeholder="地址"
                    style={{ flex: 3 }}
                    {...halfWidthProps}
                  />
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
            tooltip="僅能輸入英數"
            placeholder=""
            rules={[{ required: true, message: '必填' }, { validator: checkClientId }]}
            fieldProps={{
              maxLength: 10,
              onChange: (e) => {
                // 輸入文字轉換: 只允許輸入英數字，並強制轉大寫
                const upper = e.target.value
                  .replace(/[^a-zA-Z0-9]/g, '') // 只允許輸入英數字
                  .toUpperCase() // 強制轉大寫
                // 更新數值
                formRef?.current?.setFieldValue('clientId', upper)
                handleValueChange()
              }
            }}
          />
          {/* 案例4 */}
          <ProFormText
            name="receiveNo"
            // label='受理號碼'
            label={
              <span>
                受理號碼
                <Typography.Text style={{ color: 'blue' }}>（按 F6 或 圖標 查詢）</Typography.Text>
              </span>
            }
            placeholder="請輸入受理號碼"
            rules={[
              { required: true, message: '必填' }
            ]}
            fieldProps={{
              ...toUpperProps,
              // 透過 後置圖標 設定 查詢按鈕
              suffix: (
                <Tooltip title="查詢">
                  <SearchOutlined onClick={() => setShowModal(true)} />
                </Tooltip>
              ),
              // 監聽鍵盤事件
              onKeyDown: (e) => {
                if (e.key === 'F6') {
                  e.preventDefault() // 防止 F6 的瀏覽器預設行為
                  setShowModal(true)
                }
              }
            }}
          />
          <OptionReceiveNo
            formRef={formRef}
            showModal={showModal}
            setShowModal={setShowModal}
            handleValueChange={handleValueChange}
          />
        </MliFormRow>
        <MliFormRow>
          {/* 案例 5 */}
          <ProFormText
            name='halfWidth'
            label='半形測試'
            placeholder=''
            fieldProps={{
              maxLength: 200,
              ...halfWidthProps
            }}
          />
          {/* 案例 6 */}
          <ProFormText
            name="fullWidth"
            label="全形測試"
            placeholder=""
            fieldProps={{
              maxLength: 200,
              ...fullWidthProps
            }}
          />
          {/* 案例 7 */}
          <ProFormText
            name="alnum"
            label="保留英數"
            placeholder=""
            fieldProps={{
              maxLength: 200,
              ...alnumProps
            }}
          />
          {/* 案例 8 */}
          <ProFormText
            name="num"
            label="僅輸入數字"
            placeholder=""
            fieldProps={{
              maxLength: 200,
              ...numProps
            }}
          />
        </MliFormRow>

        {/* 底部功能區 */}
        <FooterToolbar>
          <Button type='primary' onClick={submitterRender}>送出</Button>
        </FooterToolbar>
      </ProForm>
    </PageContainer>
  )
}

export default MyForm
