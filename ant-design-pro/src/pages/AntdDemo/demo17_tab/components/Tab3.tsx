import React from 'react';
import { ProFormInstance, ProFormText } from '@ant-design/pro-form';

interface Tab1Props {
  formRef: React.RefObject<ProFormInstance>;
}

const Tab1: React.FC<Tab1Props> = ({ formRef }) => {
  return (
    <>
      <ProFormText
        name={['basic', 'name']}
        label="基本資料-姓名 (唯讀)"
        readonly
        fieldProps={{
          value: formRef.current?.getFieldValue('basic.name'),
        }}
      />
      <ProFormText
        name={['tab3', 'field1']}
        label="分頁3 欄位1"
        rules={[{ required: true, message: '此欄位為必填' }]}
      />
      <ProFormText
        name={['tab3', 'field2']}
        label="分頁3 欄位2"
        rules={[{ required: true, message: '此欄位為必填' }]}
      />
    </>
  );
};

export default Tab1;