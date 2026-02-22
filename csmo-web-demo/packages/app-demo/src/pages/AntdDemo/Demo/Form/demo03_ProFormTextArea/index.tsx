import { MliFormRow } from '@mli-csmo/base'
import ProForm, { ProFormInstance, ProFormTextArea } from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { Button, message, Modal } from 'antd'
import { useEffect, useRef } from 'react'

const Demo: React.FC = () => {
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
          <ProFormTextArea
            name='description'
            label='列管原因'
            placeholder='請輸入列管原因'
            colSize={2}
            fieldProps={{   // 參數設定
              rows: 4, // 設置文本框顯示的行數
              maxLength: 200, // 限制最大字數
              showCount: true  // 顯示字數計數
            }}
            rules={[        // 檢核
              {
                required: true
              }
            ]}
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

export default Demo
