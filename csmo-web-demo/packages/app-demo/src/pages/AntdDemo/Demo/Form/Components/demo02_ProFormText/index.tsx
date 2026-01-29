import { MliFormCol, MliFormRow } from '@mli-csmo/base'
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, Input, message, Space, Tooltip, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { isGuiNumberValid, isNationalIdentificationNumberValid, isResidentCertificateNumberValid } from 'taiwan-id-validator'
import { debounce } from 'lodash'
import { log } from 'console'
import { SearchOutlined } from '@ant-design/icons'
import OptionReceiveNo from './Components/optionRecevieNo'
import { toFullWidth, toHalfWidth } from '@/utils/StringUtil/StringUtil'

// 模擬數據
let data = {}

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const [showModal, setShowModal] = useState(false)     // modal 開關

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

  return (
    <>
      <Typography.Title level={3}>ProFormText</Typography.Title>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
        onValuesChange={handleValueChange}
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
                  <Input
                    placeholder="地址" style={{ flex: 3 }}
                    // 失去焦點時，將全形字元轉為半形
                    onBlur={(e) => {
                      const value = e.target.value;
                      formRef?.current?.setFieldsValue({ address: toHalfWidth(value) });
                    }}
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
                handleValueChange()
              },
            }}
          />
          {/* 案例4 */}
          <ProFormText
            name='receiveNo'
            // label='受理號碼'
            label={
              <span>
                受理號碼
                <Typography.Text style={{ color: 'blue' }}>（按 F6 或 圖標 查詢）</Typography.Text>
              </span>
            }
            placeholder='請輸入受理號碼'
            rules={[
              {
                required: true,
                message: '必填'
              }
            ]}
            fieldProps={{
              // 透過 後置圖標 設定 查詢按鈕  
              suffix: (
                <Tooltip title='查詢'>
                  <SearchOutlined
                    onClick={() => setShowModal(true)}
                  />
                </Tooltip>
              ),
              // 監聽鍵盤事件
              onKeyDown: (e) => {
                if (e.key === 'F6') {
                  e.preventDefault(); // 防止 F6 的瀏覽器預設行為
                  setShowModal(true);
                }
              },
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
              // 失去焦點時，將全形字元轉為半形
              onBlur: (e) => {
                const value = e.target.value;
                formRef?.current?.setFieldsValue({ halfWidth: toHalfWidth(value) });
              }
            }}
          />
          {/* 案例 6 */}
          <ProFormText
            name='fullWidth'
            label='全形測試'
            placeholder=''
            fieldProps={{ 
              maxLength: 200,
              // 失去焦點時，將全形字元轉為半形
              onBlur: (e) => {
                const value = e.target.value;
                formRef?.current?.setFieldsValue({ fullWidth: toFullWidth(value) });
              }
            }}
          />
        </MliFormRow>
      </ProForm>
    </>
  )
}

export default MyForm
