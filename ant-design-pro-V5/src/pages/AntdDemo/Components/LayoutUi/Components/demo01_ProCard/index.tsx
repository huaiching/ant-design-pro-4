import ProCard from '@ant-design/pro-card'
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form'
import { Button, ConfigProvider, message, Modal, Segmented, Space, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { FooterToolbar } from '@ant-design/pro-layout'
import { MliFormRow } from '@mli-csmo/base'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

const editOption = [
  { value: 'edit', icon: <CheckOutlined /> },
  { value: 'disabled', icon: <CloseOutlined /> }
]

const initData = {
  policyNo: '1234567890',
  poStsCode: '42'
}

const InsurancePolicyCard: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const [poEdit, setPoEdit] = useState<string>('disabled')

  // 設定初始值
  useEffect(() => {
    formRef.current?.setFieldValue('Q1', initData)
  }, [])

  // 設定 詢問視窗
  const disabledModel = (questionNo: string): Promise<boolean> => {
    const title = questionNo + ' 是否確定要 取消編輯？'
    return new Promise((resolve) => {
      Modal.confirm({
        title: title,
        content: '這將會還原資料，修改將會消失。',
        okText: '確定',
        cancelText: '取消',
        onOk: () => resolve(true),
        onCancel: () => resolve(false),
      })
    })
  }


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
                console.info('formRef', formRef.current?.getFieldsValue())
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
    <ProForm
      grid
      layout='vertical'
      formRef={formRef}
      submitter={submitterRender()}
    >
      <ProCard
        // title='保單資訊'
        title={
          <Space wrap align="center" size='large'>
            <Segmented
              value={poEdit}
              options={editOption}
              size='large'
              shape="round"
              onChange={async (value) => {
                // 取消編輯確認
                if (value === 'disabled') {
                  const recode = await disabledModel('Q1')
                  if (!recode) {
                    return
                  }
                }
                // 資料還原
                if (value === 'disabled') {
                  formRef.current?.setFieldValue('Q1', initData)
                  message.info('資料已還原')
                }
                // 狀態修改
                setPoEdit(value)
              }}
            />
            <Typography.Title level={4}>Q1</Typography.Title>
            <Typography.Title level={4}>保單資訊</Typography.Title>
          </Space>
        }
        type='inner'
        size='small'
        headerBordered      // 有 分隔線
        collapsible         // 有 摺疊
        defaultCollapsed    // 預設 折疊
        extra={
          <Typography.Text>extra</Typography.Text>
        }
      >
        <ConfigProvider componentDisabled={poEdit !== 'edit'}>
          <MliFormRow>
            <ProFormText
              name={['Q1','policyNo']}
              label='保單號碼'
              placeholder=''
            />
            <ProFormText
              name={['Q1','poStsCode']}
              label='保單狀態'
              placeholder=''
            />
          </MliFormRow>
        </ConfigProvider>
      </ProCard>
    </ProForm>
  )
}

export default InsurancePolicyCard
