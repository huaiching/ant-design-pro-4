import React from 'react';
import { Card } from 'antd';
import { ProCard, ProFormInstance } from '@ant-design/pro-components';

interface Props {
  formRef: React.RefObject<ProFormInstance | undefined>;
}
const InfoForm: React.FC<Props> = ({ formRef }) => {
  return (
    <ProCard title="基本資訊" ghost>
      <p>這裡是頁面基本資訊展示區域</p>
      <p>可以顯示用戶資訊、系統狀態等</p>
    </ProCard>
  )
}

export default InfoForm;
