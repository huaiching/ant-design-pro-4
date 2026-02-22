import { MliFormCol, MliFormRow } from '@mli-csmo/base'
import ProForm, { ProFormInstance } from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { Button, Input, InputNumber, List, message, Modal, Space } from 'antd'
import React, { useEffect, useRef } from 'react'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
    
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
    <PageContainer>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={false}
        onValuesChange={handleValueChange}
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

        {/* 底部功能區 */}
        <FooterToolbar>
          <Button type='primary' onClick={submitterRender}>送出</Button>
        </FooterToolbar>
      </ProForm>
    </PageContainer>
  )
}

export default MyForm
