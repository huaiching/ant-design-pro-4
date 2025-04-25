import { MliFormRow } from '@/common';
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { FooterToolbar } from '@ant-design/pro-layout';
import { Button, message, Typography } from 'antd';
import React, { useRef } from 'react';

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

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

  const vaildatorEmail = (rule: any, value: any) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!re.test(value)) {
      return Promise.reject("不符合規範!!")
    }
    return Promise.resolve()
  }

  return (
    <>
      <Typography.Title level={3}>ProFormText</Typography.Title>
      <ProForm
        grid
        layout="vertical"
        formRef={formRef}
        submitter={submitterRender()}
      >
        <MliFormRow>
          <ProFormText
            name="email"
            label="電子郵件"
            tooltip="這是用戶電子郵件"
            placeholder="請輸入電子郵件"
            colSize={1}
            rules={[
              {
                  required: true,
                  message: '必填',
              },
              {
                validator: vaildatorEmail
              },
            ]}
            fieldProps={{
                maxLength: 72,
            }}
          />
        </MliFormRow>
      </ProForm>
    </>
  )
};

export default MyForm;
