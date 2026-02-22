import { MliFormRow } from '@mli-csmo/base'
import ProForm, { ProFormInstance, ProFormSelect } from '@ant-design/pro-form'
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

  /** 下拉選單設定 **/
  // 選擇部門
  const departmentOptions = [
    { value: 'IT', label: '資訊部' },
    { value: 'HR', label: '人事部' },
    { value: 'FIN', label: '財務部' },
    { value: 'TEST', label: '測試部它的文字非常多超級多宇宙霹靂無敵爆炸多會怎麼辦呢' }
  ]
  // 選擇縣市
  const cityOptions = [
    { value: 'TP', label: '台北市' },
    { value: 'NTPC', label: '新北市' },
    { value: 'TC', label: '台中市' },
    { value: 'TN', label: '台南市' },
    { value: 'KS', label: '高雄市' }
  ]
  // 選擇飲料
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

        {/* 底部功能區 */}
        <FooterToolbar>
          <Button type='primary' onClick={submitterRender}>送出</Button>
        </FooterToolbar>
      </ProForm>
    </PageContainer>
  )
}

export default Demo
