import MliFormRow from '@/common/components/form/MliFormRow';
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { FooterToolbar } from '@ant-design/pro-layout';
import { Button, message, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import OptionReceiveNo from "./components/optionRecevieNo";

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>(undefined)
  const [showModal, setShowModal] = useState(false)     // modal 開關
  const [receiveEdit, setReceiveEdit] = useState(true)  // 受理號碼查詢 開關

  useEffect(()=>{
    const receiveNo = formRef.current?.getFieldValue('receiveNo')
    if (!receiveNo) {       // 空值 開啟 受理號碼查詢
      setReceiveEdit(true)
    } else {
      setReceiveEdit(false)
    }
  })

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

  return (
    <>
      <Typography.Title level={3}>進階應用測試</Typography.Title>
      <ProForm
        grid
        layout="vertical"
        formRef={formRef}
        submitter={submitterRender()}
      >
        <MliFormRow>
          <ProFormText
            name="receiveNo"
            label="受理號碼"
            placeholder="請輸入受理號碼"
            disabled
            rules={[
              {
                  required: true,
                  message: '必填',
              },
            ]}
            fieldProps={{       // 透過 後置圖標 設定 查詢按鈕
              suffix: (
                  <Button type='text' disabled={!receiveEdit} onClick={()=>setShowModal(true)}>查詢</Button>
                ),
            }}
          />
            <OptionReceiveNo formRef={formRef} showModal={showModal} setShowModal={setShowModal} />
        </MliFormRow>
      </ProForm>
    </>
  )
};

export default MyForm;
