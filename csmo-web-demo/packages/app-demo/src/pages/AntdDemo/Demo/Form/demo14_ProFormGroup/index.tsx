import ProForm, { ProFormGroup, ProFormInstance, ProFormSelect, ProFormText } from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { MliFormRow, MliFormCol } from '@mli-csmo/base'
import { Button, message, Modal } from 'antd'
import React, { useEffect, useRef } from 'react'
import { log } from 'console'
import { debounce } from 'lodash'

// 模擬數據
let data = {}

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

  // 下拉式選單
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
    { label: '連江縣', value: '連江縣' }
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
          <MliFormCol colSize={2}>
            <ProFormGroup title='地址資訊' titleStyle={{ fontWeight: 'normal' }}>
              <ProFormSelect
                name='county'
                placeholder='請選擇縣市'
                rules={[{ required: true, message: '請選擇縣市' }]}
                width='sm'
                colProps={{ span: 8 }}
                options={countyOptions}
                showSearch
              />
              <ProFormText
                name='district'
                placeholder='請輸入區'
                rules={[{ required: true, message: '請輸入區' }]}
                width='sm'
                colProps={{ span: 8 }}
              />
              <ProFormText
                name='road'
                placeholder='請輸入路段'
                rules={[{ required: true, message: '請輸入路段' }]}
                width='md'
                colProps={{ span: 8 }}
              />
            </ProFormGroup>
          </MliFormCol>
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
