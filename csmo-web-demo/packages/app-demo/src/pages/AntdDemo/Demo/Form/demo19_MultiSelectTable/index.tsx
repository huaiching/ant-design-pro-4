import { FooterToolbar, PageContainer, ProForm, ProFormInstance } from '@ant-design/pro-components'
import { MliFormCol, MliFormRow } from '@mli-csmo/base'
import { Button, message, Modal } from 'antd'
import React, { useEffect, useRef } from 'react'
import MultiSelectTable from './Components/MultiSelectTable'
import MultiSelectEditTable from './Components/MultiSelectEditTable'

const SelectTable: React.FC = () => {
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

  // 檢核
  const validateMaxThree = async (value: any[]) => {
    if (value && value.length > 3) {
      return Promise.reject('最多只能選擇 3 筆資料')
    }
    return Promise.resolve()
  }

  // 下拉式選單
  const optionsData = [
    { code: 'A01', text: '頭暈' },
    { code: 'B02', text: '咳嗽' },
    { code: 'C03', text: '喉嚨痛' },
    { code: 'D04', text: '發燒' },
    { code: 'E05', text: '流鼻水' }
  ]
  // 無編輯表格: 欄位設定
  const column = [
    { title: '代碼', dataIndex: 'code', valueType: 'text' },
    { title: '文字', dataIndex: 'text', valueType: 'text' }
  ]
  // 有編輯表格: 欄位設定
  const columnEdit = [
    { title: '代碼', dataIndex: 'code', valueType: 'text', readonly: true },
    { title: '文字', dataIndex: 'text', valueType: 'text', readonly: true },
    {
      title: '處方', dataIndex: 'prescription', valueType: 'select', fieldProps: {
        options: [
          { label: 'A 吃藥', value: 'A' },
          { label: 'B 打針', value: 'B' },
          { label: 'C 住院', value: 'C' },
        ]
      },
      formItemProps: {
        rules: [{ required: true, message: '不可空白' }]
      },
    }
  ]

  return (
    <PageContainer>
      <ProForm
        grid
        layout="vertical"
        formRef={formRef}
        submitter={false}
        onValuesChange={handleValueChange}
        style={{ width: '100%' }}
      >
        <MliFormRow gutter={8} style={{ width: '100%' }}>
          <MliFormCol colSize={4 / 3}>
            <MultiSelectTable
              label="無編輯表格"
              name="symptom1"
              formRef={formRef}
              column={column}
              optionsData={optionsData}
              required
              // buttonType
              validator={validateMaxThree}
              onChange={(value) => {
                message.info('資料筆數：' + value.length)
              }}
            />
          </MliFormCol>
          <MliFormCol colSize={2}>
            <MultiSelectEditTable
              label="有編輯表格"
              name="symptomEdit1"
              formRef={formRef}
              column={columnEdit}
              optionsData={optionsData}
              required
              // buttonType
              validator={validateMaxThree}
              onChange={(value) => {
                message.info('資料筆數：' + value.length)
              }}
            />
          </MliFormCol>
        </MliFormRow>
        <MliFormRow gutter={8} style={{ width: '100%' }}>
          <MliFormCol colSize={4 / 3}>
            <MultiSelectTable
              label="無編輯表格 (按鈕樣式)"
              name="symptom2"
              formRef={formRef}
              column={column}
              optionsData={optionsData}
              required
              buttonType
              validator={validateMaxThree}
              onChange={(value) => {
                message.info('資料筆數：' + value.length)
              }}
            />
          </MliFormCol>
          <MliFormCol colSize={2}>
            <MultiSelectEditTable
              label="有編輯表格 (按鈕樣式)"
              name="symptomEdit2"
              formRef={formRef}
              column={columnEdit}
              optionsData={optionsData}
              required
              buttonType
              validator={validateMaxThree}
              onChange={(value) => {
                message.info('資料筆數：' + value.length)
              }}
            />
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

export default SelectTable
