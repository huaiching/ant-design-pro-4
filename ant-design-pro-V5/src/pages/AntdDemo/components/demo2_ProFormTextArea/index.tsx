import MliFormRow from '@/common/components/form/MliFormRow'
import ProForm, { ProFormInstance, ProFormTextArea } from "@ant-design/pro-form"
import { FooterToolbar } from "@ant-design/pro-layout"
import { Button, message, Typography } from "antd"
import { useRef } from "react"

const Demo: React.FC =() => {
  const formRef = useRef<ProFormInstance>(undefined)

  // 控制送出後之動作
  const submitterRender = () => {
    return {
      render: () => (
        <FooterToolbar>
            <Button
              type="primary"
              onClick={async () => {
                formRef.current?.validateFields().then(values => {
                  // 確認按鈕 點擊後 要進行的 API 操作
                  message.success('表單提交成功！');
                })
              }}
              key="save"
            >
              確認
            </Button>
            <Button
              onClick={async () => {
                  // 取消按鈕 點擊後 要進行的 API 操作
                  message.warning('取消作業');
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
      <Typography.Title level={3}>ProFormTextArea</Typography.Title>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
      >
        <MliFormRow>
          <ProFormTextArea
              name="description"
              label="列管原因"
              placeholder="請輸入列管原因"
              colSize={2}
              fieldProps={{   // 參數設定
                rows: 4, // 設置文本框顯示的行數
                maxLength: 200, // 限制最大字數
                showCount: true, // 顯示字數計數
              }}
              rules={[        // 檢核
                {
                    required: true,
                }
              ]}
          />
        </MliFormRow>
      </ProForm>
    </>
  )
}

export default Demo
