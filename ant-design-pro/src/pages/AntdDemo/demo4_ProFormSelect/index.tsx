import MliFormRow from '@/common/components/form/MliFormRow';
import ProForm, { ProFormInstance, ProFormSelect } from "@ant-design/pro-form"
import { FooterToolbar } from "@ant-design/pro-layout"
import { Button, message } from "antd"
import { useRef } from "react"

const Demo: React.FC =() => {
  const formRef = useRef<ProFormInstance>()

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
      <h1>ProFormSelect</h1>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
      >
        <MliFormRow>
          <ProFormSelect
            name="department"
            label="選擇部門"
            placeholder="請選擇部門"
            colSize={1}
            options={[
              { value: 'IT', label: '資訊部' },
              { value: 'HR', label: '人事部' },
              { value: 'FIN', label: '財務部' },
            ]}
            rules={[
              { required: true, message: '部門為必填項' }
            ]}
          />
        </MliFormRow>
      </ProForm>
    </>
  )
}

export default Demo
