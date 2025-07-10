import MliFormRow from '@/common/components/form/MliFormRow';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Typography } from 'antd';
import React from 'react';

const MyForm: React.FC = () => {

  return (
    <>
      <Typography.Title level={3}>MliFormRow</Typography.Title>
      <ProForm
        grid
        layout="vertical"
        // formRef={formRef}
        submitter={false}
      >
        <MliFormRow gutter={[2, 2]} align='bottom' justify='start'>
          <MliFormRow gutter={[2, 2]} align='bottom' justify='start'>
            <ProFormText
              name="failed1_1"
              colSize={1}
              initialValue="1"
            />
            {[2, 3, 4].map(i => (
              <ProFormText
                name={`failed1_${i}`}
                colSize={1}
                initialValue="1"
              />
            ))}
          </MliFormRow>

          <MliFormRow gutter={[2, 2]} align='bottom' justify='start'>
            <ProFormText
              name="failed2_1"
              colSize={1 / 2}
              initialValue='1/2'
            />
            {[2, 3, 4, 5, 6, 7, 8].map(i => (
              <ProFormText
                name={`failed2_${i}`}
                colSize={1 / 2}
                initialValue='1/2'
              />
            ))}
          </MliFormRow>
          <MliFormRow gutter={[2, 2]} align='bottom' justify='start'>
            <ProFormText
              name="failed3_1"
              colSize={1 / 3}
              initialValue='1/3'
            />
            {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
              <ProFormText
                name={`failed3_${i}`}
                colSize={1 / 3}
                initialValue='1/3'
              />
            ))}
          </MliFormRow>
        </MliFormRow>
      </ProForm>
    </>
  )
};

export default MyForm;
