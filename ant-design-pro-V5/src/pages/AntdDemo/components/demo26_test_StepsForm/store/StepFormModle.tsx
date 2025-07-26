import React from 'react';
import { Button } from 'antd';
import { ProFormInstance, StepsForm } from '@ant-design/pro-form';
import { FooterToolbar } from '@ant-design/pro-layout';

export interface StepItem {
  title: string;                                            // 步驟標題文字
  name: string;                                             // 步驟名稱代碼
  formRef: React.RefObject<ProFormInstance | undefined>;    // 步驟資料變數
  content: React.ReactNode;                     // 步驟頁面檔
  onStepEnter?: () => void;                     // 進入步驟時要觸發的事件
}

interface MyStepsFormProps {
  steps: StepItem[];
  onFinish: (values: any) => Promise<void>;
}

const MyStepsForm: React.FC<MyStepsFormProps> = ({ steps, onFinish }) => {
  const submitter = () => {
    return {
      render: (props: any) => {
        const isLast = props.step === steps.length - 1;
        return [
          <FooterToolbar key="footer">
            {props.step > 0 && (
              <Button type="primary" onClick={() => props.onPre?.()}>
                上一步
              </Button>
            )}
            <Button type="primary" onClick={() => props.onSubmit?.()}>
              {isLast ? '提交' : '下一步'}
            </Button>
          </FooterToolbar>
        ];
      }
    };
  };

  return (
    <StepsForm
      containerStyle={{ width: '100%' }}
      onCurrentChange={(current) => {
        steps[current]?.onStepEnter?.(); // 每個步驟的 onStepEnter
      }}
      onFinish={onFinish}
      submitter={submitter()}
    >
      {steps.map((step) => (
        <StepsForm.StepForm
          key={step.name}
          grid
          title={step.title}
          name={step.name}
          formRef={step.formRef}
        >
          {step.content}
        </StepsForm.StepForm>
      ))}
    </StepsForm>
  );
};

export default MyStepsForm;
