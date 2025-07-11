import React, { useEffect, useRef } from 'react';
import { Button, message, Space } from 'antd';
import { ProFormInstance, StepsForm } from '@ant-design/pro-form';
import Step1 from './components/step1'
import Step2 from './components/step2'
import Step3 from './components/step3'
import { FooterToolbar } from '@ant-design/pro-layout';

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

  // onFinish 的內容範例
  const onFinish = async (value: any) => {
      console.log('value',value)
      console.log('formRef1',formRef1.current?.getFieldsValue())
      console.log('formRef2',formRef2.current?.getFieldsValue())
      console.log('formRef3',formRef3.current?.getFieldsValue())
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
          <FooterToolbar>
            {previousShow &&
            <Button type='primary' onClick={()=> props.onPre?.()}
            >{previousName}</Button>}

            <Button type='primary' onClick={()=> props.onSubmit?.()}
            >{nextName}</Button>
          </FooterToolbar>
        ]
      },
    }
  }

  return (
    <StepsForm
      containerStyle={{ width: '100%' }}
      onCurrentChange={(current)=>{         // 每個步驟完成會觸發的事件，current = 步驟數 (0 ~)
        const msg = '完成 步驟 ' + current
        message.info(msg)
      }}
      onFinish={onFinish}                   // 最後提交會觸發的事件
      submitter={submitter()}               // StepsForm 這裡進行 步驟切換 的選項設定
    >
      <StepsForm.StepForm
        grid
        title="輸入客戶基本資料"
        name='step1'
        formRef={formRef1}
      >
        <Step1/>
      </StepsForm.StepForm>

      <StepsForm.StepForm
        grid
        title="輸入客戶住址"
        name='step2'
        formRef={formRef2}
      >
        <Step2/>
      </StepsForm.StepForm>

      <StepsForm.StepForm
        grid
        title="輸入客戶電話"
        name='step3'
        formRef={formRef3}
      >
        <Step3/>
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default MyStepsForm;
