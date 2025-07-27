import MliFormCol from '@/common/components/form/MliFormCol'
import MliFormRow from '@/common/components/form/MliFormRow'
import ProForm, { ProFormInstance, ProFormItem } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { AutoComplete, Button, message, Typography } from 'antd'
import React, { useRef } from 'react'

const MyForm: React.FC = () => {
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
                message.success('表單提交成功！')
              })
            }}
            key="save"
          >
            確認
          </Button>
          <Button
            onClick={async () => {
              // 取消按鈕 點擊後 要進行的 API 操作
              message.warning('取消作業')
            }}
          >
            取消
          </Button>
        </FooterToolbar>
      )
    }
  }

  const countyOptions = [
    { label: '臺北市', value: '臺北市' },
    { label: '新北市', value: '新北市' },
    { label: '桃園市', value: '桃園市' },
    { label: '臺中市', value: '臺中市' },
    { label: '臺南市', value: '臺南市' },
    { label: '高雄市', value: '高雄市' },
    { label: '基隆市', value: '基隆市' },
    { label: '新竹市', value: '新竹市' },
    { label: '嘉義市', value: '嘉義市' },
    { label: '新竹縣', value: '新竹縣' },
    { label: '苗栗縣', value: '苗栗縣' },
    { label: '彰化縣', value: '彰化縣' },
    { label: '南投縣', value: '南投縣' },
    { label: '雲林縣', value: '雲林縣' },
    { label: '嘉義縣', value: '嘉義縣' },
    { label: '屏東縣', value: '屏東縣' },
    { label: '宜蘭縣', value: '宜蘭縣' },
    { label: '花蓮縣', value: '花蓮縣' },
    { label: '臺東縣', value: '臺東縣' },
    { label: '澎湖縣', value: '澎湖縣' },
    { label: '金門縣', value: '金門縣' },
    { label: '連江縣', value: '連江縣' },
  ]

  return (
    <>
      <Typography.Title level={3}>AutoComplete</Typography.Title>
      <ProForm
        grid
        layout="vertical"
        formRef={formRef}
        submitter={submitterRender()}
      >
        <MliFormRow>
          <MliFormCol colSize={2}>
            <ProFormItem
              name='county'
              label="縣市"
              rules={[{ required: true, message: '請輸入縣市' }]}
            >
              <AutoComplete
                placeholder="請輸入縣市"
                options={countyOptions}
                allowClear
                filterOption={(inputValue, option) =>
                  !!option && option.label.toLowerCase().includes(inputValue.toLowerCase())
                }
              />
            </ProFormItem>
          </MliFormCol>
        </MliFormRow>
      </ProForm>
    </>
  )
}

export default MyForm
