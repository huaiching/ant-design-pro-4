import React, { useEffect, useRef } from 'react';
import ProForm, { ProFormDatePicker, ProFormDateRangePicker, ProFormInstance } from '@ant-design/pro-form';
import { FooterToolbar } from '@ant-design/pro-layout';
import { Button, message } from 'antd';
import MliFormRow from '@/common/components/form/MliFormRow';
import moment from 'moment';

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
                  // 日期轉換為民國年
                  const chkDate = momentTW(formRef.current?.getFieldValue('chkDate'), 'YYYY-MM-DD').format('tYY/MM/DD')
                  const chkDateYYMM = momentTW(formRef.current?.getFieldValue('chkDateYYMM'), 'YYYY-MM-DD').format('tYY/MM')
                  const chkDateRangeStart = momentTW(formRef.current?.getFieldValue('chkDateRange')[0], 'YYYY-MM-DD').format('tYY/MM/DD')
                  const chkDateRangeEnd = momentTW(formRef.current?.getFieldValue('chkDateRange')[1], 'YYYY-MM-DD').format('tYY/MM/DD')
                  console.log('chkDate', chkDate)
                  console.log('chkDateYYMM', chkDateYYMM)
                  console.log('chkDateRangeStart', chkDateRangeStart)
                  console.log('chkDateRangeEnd', chkDateRangeEnd)
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
              format: (data: any) => momentTW(data).format('tYY/MM/DD'),
            }}
          />
          <ProFormDatePicker
            name="chkDate2"
            label="選擇日期"
            placeholder="請選擇日期"
            rules={[
              { required: true, message: '日期為必填項' },
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
              { required: true, message: '日期為必填項' },
            ]}
            fieldProps={{
              format: (data: any) => momentTW(data).format('tYY/MM'),
            }}
          />
          <ProFormDateRangePicker
            name="chkDateRange"
            label="選擇日期區間"
            rules={[
              { required: true, message: '日期為必填項' },
            ]}
            fieldProps={{
              format: (data: any) => momentTW(data).format('tYY/MM/DD'),
            }}
          />
        </MliFormRow>
      </ProForm>
    </>
  );
};
export default MyForm;
