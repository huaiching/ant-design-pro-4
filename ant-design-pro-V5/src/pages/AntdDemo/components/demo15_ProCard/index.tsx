import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { Button, message, Segmented, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { editOption } from './store/editOption';
import { FooterToolbar } from '@ant-design/pro-layout';
import MliFormRow from '@/common/components/form/MliFormRow';

const InsurancePolicyCard: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const [poEdit, setPoEdit] = useState<Boolean>(false)

  useEffect(()=>{
      formRef.current?.setFieldsValue({
          policyNo: '1234567890',
          poStsCode: '42',
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
                  message.success('表單提交成功！');
                  console.log('formRef', formRef.current?.getFieldsValue())
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
    <ProForm
      grid
      layout="vertical"
      formRef={formRef}
      submitter={submitterRender()}
    >
      <ProCard
        title="保單資訊"
        type='default'
        size='default'
        headerBordered      // 有 分隔線
        collapsible         // 有 摺疊
        defaultCollapsed    // 預設 折疊
        extra={
          // 分段控制器: 這裡用來控制 編輯 的切換
          <Segmented
            options={editOption}        // 分頁控制器的內容設定 (預設選擇第一個)
            onChange={(value) => {      // 切換事件：value=切換後的數值
              setPoEdit(value === 'edit');
            }}
          />
        }
      >
        <MliFormRow>
          <ProFormText
            name="policyNo"
            label="保單號碼"
            readonly={!poEdit}
          />
          <ProFormText
            name="poStsCode"
            label="保單狀態"
            readonly={!poEdit}
          />
        </MliFormRow>
      </ProCard>
    </ProForm>
  );
};

export default InsurancePolicyCard;
