import React, { useRef } from 'react'
import { Descriptions, Button, Modal, message } from 'antd'
import { ProForm, ProFormText, FooterToolbar, ProFormInstance } from '@ant-design/pro-components'
import { observer } from 'mobx-react'
import basicStore from '../Mobx/basicStore'
import InfoForm from './Components/InfoForm'

interface Props {
    handleStep: (step: number) => void
}

const Step2Form: React.FC<Props> = ({ handleStep }) => {
  const formRef = useRef<ProFormInstance>()
  const basicData = basicStore.getBasic

  const handleSubmit = async () => {
    const values = await formRef.current?.validateFields()
    Modal.confirm({
      title: '是否完成作業？',
      onOk: () => {
        message.success('已完成作業')
        console.info('所有資料：', { ...basicData, ...values })
      },
    })
  }

  return (
    <>
      <InfoForm/>

      <ProForm formRef={formRef} submitter={false} style={{ marginTop: 24 }}>
        <ProFormText name="chgData1" label="變更資料一" rules={[{ required: true }]} />
        <ProFormText name="chgData2" label="變更資料二" rules={[{ required: true }]} />
      </ProForm>

      <FooterToolbar>
        <Button type="primary" onClick={handleSubmit}>完成</Button>
        <Button danger onClick={() => handleStep(0)}>取消</Button>
      </FooterToolbar>
    </>
  )
}

export default observer(Step2Form)
