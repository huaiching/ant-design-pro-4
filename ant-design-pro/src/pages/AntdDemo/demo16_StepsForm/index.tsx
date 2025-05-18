import React, { useEffect, useRef, useState } from 'react';
import { Button, message, Space } from 'antd';
import { ProFormInstance, ProFormText, StepsForm } from '@ant-design/pro-form';

  const initData = {
    step1: {
      clientId: 'A123456789',
      name: '測試員',
    },
    step2: {
      address: '台北市內湖區石潭路58號1樓',
    },
    step3: {
      phone: '0911222333'
    }
  }

const MyStepsForm: React.FC = () => {
  
  const formMapRef = useRef<
    React.MutableRefObject<ProFormInstance<any> | undefined>[]
  >([]);

  useEffect(()=>{
    formMapRef.current.forEach((formRef)=>{
      formRef.current?.setFieldsValue(initData)
    })
  },[])

  // onFinish 的內容範例
  const onFinish = async (value: any) => {
      console.log('value',value)
      formMapRef.current?.forEach((formRef, index)=>{
        console.log(index,formRef.current?.getFieldsValue())
      })
      message.success('提交成功')
    }

  // submitter 的內容範例
  const submitter = () => {
    return {
      render: (props: any) => {
        // 上一步 設定
        const previousName = '上一步'
        const previousShow = props.step > 0 ? true : false 
        // 下一步 設定
        const nextName = props.step === 2 ? '提交' : '下一步'

        return [
          <Space>
            {previousShow &&
            <Button type='primary' onClick={()=> props.onPre?.()}
            >{previousName}</Button>}
            
            <Button type='primary' onClick={()=> props.onSubmit?.()}
            >{nextName}</Button>
          </Space>
        ]
      },        
    }
  }
  
  return (
    <StepsForm
      formMapRef={formMapRef}
      onCurrentChange={(current)=>{
        const msg = '完成 步驟 ' + current
        message.info(msg)
      }}
      onFinish={onFinish}
      submitter={submitter()}
    >
      <StepsForm.StepForm
        title="輸入客戶基本資料"
        name='step1'
        onFinish={async (value) => {
          console.log('step1',value.step1)
        }}
      >
        <ProFormText
          name={['step1', 'clientId']}
          label='身份證字號'
          rules={[
              {
                  required: true,
                  message: '必填項',
              },
          ]}
        />
        <ProFormText
          name={['step1', 'name']}
          label='姓名'
          rules={[
              {
                  required: true,
                  message: '必填項',
              },
          ]}
        />
      </StepsForm.StepForm>
      
      <StepsForm.StepForm
        title="輸入客戶住址"
        name='step2'
      >
        <ProFormText
          name={['step2', 'address']}
          label='聯絡地址'
          rules={[
              {
                  required: true,
                  message: '必填項',
              },
          ]}
        />
      </StepsForm.StepForm>
      
      <StepsForm.StepForm
        title="輸入客戶電話"
        name='step3'
      >
        <ProFormText
          name={['step3', 'phone']}
          label='連絡電話'
          rules={[
              {
                  required: true,
                  message: '必填項',
              },
          ]}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default MyStepsForm;
