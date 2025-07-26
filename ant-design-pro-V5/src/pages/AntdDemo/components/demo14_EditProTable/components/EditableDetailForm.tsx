import React from 'react';
import { ProForm, ProFormText, ProFormDatePicker, ProCard } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import MliFormRow from '@/common/components/form/MliFormRow';

interface EditableDetailFormProps {
  mode: 'create' | 'edit';
  initialValues?: any;
  onSubmit: (values: any) => void;
  onCancel?: () => void;
}

const EditableDetailForm: React.FC<EditableDetailFormProps> = ({
  mode,
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const readOnly = mode === 'edit';
  const title = mode === 'edit' ? '編輯保單' : '新增保單';

  return (
    <ProCard title={title}>
      <ProForm
        grid
        initialValues={initialValues}
        submitter={{
          render: (_, dom) => {
            return (
              <Space>
                {React.cloneElement(dom[1], { children: '存檔' })} {/* dom[1] 是提交按鈕 */}
                <Button onClick={onCancel}>取消</Button>
              </Space>
            );
          },
        }}
        onFinish={onSubmit}
        layout="vertical"
      >
        <MliFormRow>
          <ProFormText name="policyNo" label="保單號碼" disabled={readOnly} />
          <ProFormText name="poStsCode" label="保單狀態" />
          <ProFormText name="basicPlanCode" label="主約險種代碼" />
          <ProFormText name="basicRateScale" label="主約險種版數" />
          <ProFormDatePicker name="poIssueDate" label="保單生效日" />
          <ProFormText name="o1Name" label="要保人姓名" />
          <ProFormText name="i1Name" label="被保人姓名" />
          <ProFormText name="address" label="通訊地址" />
          <ProFormText name="phone" label="行動電話" />
          <ProFormText name="eMail" label="E-mail" />
        </MliFormRow>
      </ProForm>
    </ProCard>
  );
};

export default EditableDetailForm;