import { MliFormRow } from '@mli-csmo/base'
import ProForm, { ProFormInstance, ProFormSelect } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, message } from 'antd'
import { useRef } from 'react'

const Demo: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  const departmentOptions = [
    { value: 'IT', label: '資訊部' },
    { value: 'HR', label: '人事部' },
    { value: 'FIN', label: '財務部' },
    { value: 'TEST', label: '測試部它的文字非常多超級多宇宙霹靂無敵爆炸多會怎麼辦呢' }
  ]

  const cityOptions = [
    { value: 'TP', label: '台北市' },
    { value: 'NTPC', label: '新北市' },
    { value: 'TC', label: '台中市' },
    { value: 'TN', label: '台南市' },
    { value: 'KS', label: '高雄市' }
  ]

  const drinksOptions = [
    { value: 'black_tea', label: '紅茶' },
    { value: 'green_tea', label: '綠茶' },
    { value: 'oolong_tea', label: '烏龍茶' },
    { value: 'latte', label: '拿鐵' },
    { value: 'americano', label: '美式咖啡' },
    { value: 'orange_juice', label: '柳橙汁' },
    { value: 'apple_juice', label: '蘋果汁' },
    { value: 'smoothie', label: '冰沙' }
  ]

  // 控制送出後之動作
  const submitterRender = () => {
    return {
      render: () => (
        <FooterToolbar>
          <Button
            type='primary'
            onClick={async () => {
              formRef.current?.validateFields().then(() => {
                // 確認按鈕 點擊後 要進行的 API 操作
                console.info(formRef.current?.getFieldsValue())
                message.success('表單提交成功！')
              })
            }}
            key='save'
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
            name='department'
            label='選擇部門'
            placeholder='請選擇部門'
            colSize={1}
            options={departmentOptions}
            rules={[
              { required: true, message: '部門為必填項' }
            ]}
          />
          <ProFormSelect
            name='city'
            label='選擇縣市'
            showSearch  // 開啟搜尋功能 
            placeholder='請選擇縣市'
            colSize={1}
            options={cityOptions}
            rules={[
              { required: true, message: '縣市為必填項' }
            ]}
          />
          <ProFormSelect
            name='drinks'
            label='選擇飲料'
            showSearch
            placeholder='請選擇飲料'
            colSize={1}
            mode="multiple" // 多選模式
            options={drinksOptions}
            rules={[
              { required: true, message: '請至少選擇一種飲料' }
            ]}
          />
        </MliFormRow>
        <MliFormRow>

        </MliFormRow>
      </ProForm>
    </>
  )
}

export default Demo
