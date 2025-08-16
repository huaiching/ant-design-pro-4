import { ModalForm, ProFormInstance, ProFormText } from '@ant-design/pro-form'
import { MliFormRow } from '@mli-csmo/base'
import { Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  useEffect(()=>{
    formRef.current?.setFieldsValue({
      username: '測試員'
    })
  },[])
  // 管理 ModelForm 的開關狀態
  const [visible, setVisible] = useState(false)


  return (
    <>
      <Button type='link' onClick={() => setVisible(true)}>
        浮層表單
      </Button>
      <ModalForm
        grid
        layout='vertical'
        formRef={formRef}
        onVisibleChange={setVisible}
        visible={visible}
        submitter={false}
      >
        <MliFormRow>
          <ProFormText
            name='username'
            label='用戶名稱'
            readonly
          />
        </MliFormRow>
      </ModalForm>
    </>
  )
}

export default MyForm
