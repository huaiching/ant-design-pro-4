import { ProFormText } from '@ant-design/pro-form'
import { Button, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import OptionReceiveNo from './Components/optionRecevieNo'
import { MliFormCol } from '@mli-csmo/base'
import { SearchOutlined } from '@ant-design/icons'
import formStore from '../Mobx/formRefStore'

const MyForm: React.FC = () => {
  const formRef = formStore.getFormRef
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

  return (
    <MliFormCol>
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
    </MliFormCol>
  )
}

export default MyForm
