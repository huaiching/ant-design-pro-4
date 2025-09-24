import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, message, Tooltip, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import OptionReceiveNo from './components/optionRecevieNo'
import { MliFormRow } from '@mli-csmo/base'
import { SearchOutlined } from '@ant-design/icons'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const [showModal, setShowModal] = useState(false)     // modal 開關
  const [receiveEdit, setReceiveEdit] = useState(true)  // 受理號碼查詢 開關

  useEffect(() => {
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
            type='primary'
            onClick={async () => {
              formRef.current?.validateFields().then(() => {
                // 確認按鈕 點擊後 要進行的 API 操作
                message.success('表單提交成功！')
              })
            }}
            key='save'
          >
            確認
          </Button>
          <Button
            onClick={async () => {
              // 取消按鈕 點擊後 要進行的 API 操作
              message.warning('取消作業')
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
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
      >
        <MliFormRow>
          <ProFormText
            name='receiveNo'
            label='受理號碼'
            placeholder='請輸入受理號碼'
            rules={[
              {
                required: true,
                message: '必填'
              }
            ]}
            fieldProps={{       // 透過 後置圖標 設定 查詢按鈕
              suffix: (
                <Tooltip title='查詢'>
                  <Button type='text' disabled={!receiveEdit} icon={<SearchOutlined />} onClick={() => setShowModal(true)} />
                </Tooltip>
              )
            }}
          />
          <OptionReceiveNo formRef={formRef} showModal={showModal} setShowModal={setShowModal} />
        </MliFormRow>
      </ProForm>
    </>
  )
}

export default MyForm
