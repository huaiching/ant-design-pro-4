import React, { useEffect, useRef } from 'react';
import { message } from 'antd';
import { ProFormInstance } from '@ant-design/pro-form';
import Step1 from './components/step1'
import Step2 from './components/step2'
import Step3 from './components/step3'
import StepFormModle, { StepItem } from "./store/StepFormModle";

const MyStepsForm: React.FC = () => {
  const formRef1 = useRef<ProFormInstance>()
  const formRef2 = useRef<ProFormInstance>()
  const formRef3 = useRef<ProFormInstance>()

  useEffect(()=>{
    formRef1.current?.setFieldsValue({
      clientId: 'A123456789',
      name: '測試員',
    })
    formRef2.current?.setFieldsValue({
      address: '台北市內湖區石潭路58號1樓',
    })
    formRef3.current?.setFieldsValue({
      phone: '0911222333'
    })
  },[])

  const steps: StepItem[] = [
    {
      title: '輸入客戶基本資料',
      name: 'step1',
      formRef: formRef1,
      content: <Step1 />,
      onStepEnter: () => {
        message.info("進入步驟 1")
      }
    },
    {
      title: '輸入客戶住址',
      name: 'step2',
      formRef: formRef2,
      content: <Step2 />,
      onStepEnter: () => {
        message.info("進入步驟 2")
      }
    },
    {
      title: '輸入客戶電話',
      name: 'step3',
      formRef: formRef3,
      content: <Step3 />,
      onStepEnter: () => {
        message.info("進入步驟 3")
      }
    }
  ];


  // onFinish 的內容範例
  const onFinish = async (value: any) => {
      console.log('value',value)
      console.log('formRef1',formRef1.current?.getFieldsValue())
      console.log('formRef2',formRef2.current?.getFieldsValue())
      console.log('formRef3',formRef3.current?.getFieldsValue())
      message.success('提交成功')
    }

  return <StepFormModle steps={steps} onFinish={onFinish} />
};

export default MyStepsForm;
