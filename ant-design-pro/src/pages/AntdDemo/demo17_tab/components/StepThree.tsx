import React from 'react';
import { ProFormInstance, ProFormText } from '@ant-design/pro-form';

interface Tab3Props {
  formRef: React.RefObject<ProFormInstance>;
}

const Tab3: React.FC<Tab3Props> = ({ formRef }) => {
  return (
    <>
      <ProFormText
        name="name"
        label="基本資料-姓名 (唯讀)"
        readonly
        fieldProps={{
          value: formRef.current?.getFieldValue('name'),
        }}
      />
      <ProFormText
        name="tab3_field1"
        label="分頁3 欄位1"
        rules={[{ required: true, message: '此欄位為必填' }]}
      />
      <ProFormText
        name="tab3_field2"
        label="分頁3 欄位2"
        rules={[{ required: true, message: '此欄位為必填' }]}
      />
    </>
  );
};

export default Tab3;