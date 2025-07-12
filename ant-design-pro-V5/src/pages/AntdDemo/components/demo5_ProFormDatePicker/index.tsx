import React, { useEffect, useRef } from 'react';
import ProForm, { ProFormDatePicker, ProFormDateRangePicker, ProFormInstance } from '@ant-design/pro-form';
import { FooterToolbar } from '@ant-design/pro-layout';
import { Button, message } from 'antd';
import MliFormRow from '@/common/components/form/MliFormRow';

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>(undefined)
  // 要使用民國年轉換程式，要先設定這個方法
  const momentTW = require('moment-taiwan')
  
  useEffect(()=>{
    const stringData = momentTW().format('YYYY-MM-DD')
    formRef.current?.setFieldsValue({
      chkDate: stringData
    })
  },[])
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
                  // 取得日期資料
                  const chkDate = formRef.current?.getFieldValue('chkDate')
                  const chkDateYYMM = formRef.current?.getFieldValue('chkDateYYMM')
                  const [chkDateRangeStart, chkDateRangeEnd] = formRef.current?.getFieldValue('chkDateRange')
                  console.log('取得日期資料-chkDate', chkDate)
                  console.log('取得日期資料-chkDateYYMM', chkDateYYMM)
                  console.log('取得日期資料-chkDateRangeStart', chkDateRangeStart)
                  console.log('取得日期資料-chkDateRangeEnd', chkDateRangeEnd)
                  // 日期轉換為民國年
                  const chkDateTw = momentTW(chkDate).format('tYY/MM/DD')
                  const chkDateYYMMTw = momentTW(chkDateYYMM).format('tYY/MM')
                  const chkDateRangeStartTw = momentTW(chkDateRangeStart).format('tYY/MM/DD')
                  const chkDateRangeEndTw = momentTW(chkDateRangeEnd).format('tYY/MM/DD')
                  console.log('轉換為民國年-chkDate', chkDateTw)
                  console.log('轉換為民國年-chkDateYYMM', chkDateYYMMTw)
                  console.log('轉換為民國年-chkDateRangeStart', chkDateRangeStartTw)
                  console.log('轉換為民國年-chkDateRangeEnd', chkDateRangeEndTw)

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
      <h1>ProFormDatePicker</h1>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
      >
        <MliFormRow>
          <ProFormDatePicker
            name="chkDate"
            label="選擇日期"
            placeholder="請選擇日期"
            rules={[
              { required: true, message: '日期為必填項' },
            ]}
            fieldProps={{
              // format: (data: any) => momentTW(data).format('tYY/MM/DD'),
              format: 'YYYY/MM/DD'
            }}
          />
          <ProFormDatePicker
            name="chkDate2"
            label="選擇日期"
            placeholder="請選擇日期"
            rules={[
              // { required: true, message: '日期為必填項' },
            ]}
            fieldProps={{
              format: 'tYY/MM/DD',
            }}
          />
          <ProFormDatePicker.Month
            name="chkDateYYMM"
            label="選擇月份"
            placeholder="請選擇月份"
            rules={[
              // { required: true, message: '日期為必填項' },
            ]}
            fieldProps={{
              // format: (data: any) => momentTW(data).format('tYY/MM/DD'),
              format: 'YYYY/MM/DD'
            }}
          />
          <ProFormDateRangePicker
            name="chkDateRange"
            label="選擇日期區間"
            rules={[
              // { required: true, message: '日期為必填項' },
            ]}
            fieldProps={{
              // format: (data: any) => momentTW(data).format('tYY/MM/DD'),
              format: 'YYYY/MM/DD'
            }}
          />
        </MliFormRow>
      </ProForm>
    </>
  );
};
export default MyForm;
