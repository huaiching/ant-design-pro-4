import React, { useEffect } from 'react'
import { ProFormInstance, ProFormText } from '@ant-design/pro-form'
import MliFormRow from '@/common/components/form/MliFormRow'

interface Tab1Props {
  formRef: React.RefObject<ProFormInstance>;
  setTabFields: (tabKey: string, fields: string[][]) => void;
}

const Tab1: React.FC<Tab1Props> = ({ formRef, setTabFields }) => {
  useEffect(() => {
    // 註冊這個 tab 的欄位定義
    setTabFields('tab1', [
      ['tab1', 'field1'],
      ['tab1', 'field2']
    ])
  }, [setTabFields])

  return (
    <>
      <MliFormRow>
        <ProFormText
          name={['basic', 'clientId']}
          label="申請人ID"
          readonly
          fieldProps={{
            value: formRef.current?.getFieldValue('basic.clientId')
          }}
        />
        <ProFormText
          name={['basic', 'names']}
          label="申請人姓名"
          readonly
          fieldProps={{
            value: formRef.current?.getFieldValue('basic.names')
          }}
        />
      </MliFormRow>
      <ProFormText
        name={['tab1', 'tab1_field1']}
        label="分頁1 欄位1"
        rules={[{ required: true, message: '此欄位為必填' }]}
      />
      <ProFormText
        name={['tab1', 'tab1_field2']}
        label="分頁1 欄位2"
        rules={[{ required: true, message: '此欄位為必填' }]}
      />
    </>
  )
}

export default Tab1
