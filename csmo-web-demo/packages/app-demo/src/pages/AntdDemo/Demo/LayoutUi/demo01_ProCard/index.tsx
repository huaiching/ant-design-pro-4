import ProCard from '@ant-design/pro-card'
import ProForm, { ProFormInstance } from '@ant-design/pro-form'
import { Button, message, Modal, Segmented, Space, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { CloseOutlined, FormOutlined } from '@ant-design/icons'
import PoEdit from './Components/PoEdit'

const editOption = [
  { value: 'edit', icon: <FormOutlined style={{ color: 'blue' }} /> },
  { value: 'disabled', icon: <CloseOutlined style={{ color: 'red' }} /> }
]

const initData = {
  policyNo: '1234567890',
  poStsCode: '42'
}

const InsurancePolicyCard: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  // 保單編輯設定
  const [poEdit, setPoEdit] = useState<string>('disabled') // 編輯控制
  const [poInit, setPoInit] = useState<any>({}) // 資料初始值


  // 設定初始值
  useEffect(() => {
    setPoInit(initData)
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

  const cardConfigs = [
    {
      key: 'Q1',
      title: '保單資訊',
      init: poInit,
      edit: poEdit,
      setEdit: setPoEdit,
      component: <PoEdit poEdit={poEdit} />
    }
  ]


  return (
    <PageContainer>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
      >
        {cardConfigs.map((config) => (
          <ProCard
            key={config.key}
            title={
              <Space wrap size='large'>
                <Segmented
                  value={config.edit}
                  options={editOption}
                  size='large'
                  shape="round"
                  onChange={async (value) => {
                    // 取消編輯確認
                    if (value === 'disabled') {
                      const recode = await disabledModel(config.key)
                      if (!recode) {
                        return
                      }
                    }
                    // 資料還原
                    if (value === 'disabled') {
                      formRef.current?.setFieldValue(config.key, config.init)
                    }
                    // 狀態修改
                    config.setEdit(value)
                  }}
                />
                <Typography.Text style={{ fontSize: 18 }}>{config.key}：</Typography.Text>
                <Typography.Text style={{ fontSize: 18 }}>{config.title}</Typography.Text>
              </Space>
            }
            type='inner'
            size='small'
            ghost
            collapsible         // 有 摺疊
            defaultCollapsed    // 預設 折疊
          >
            {config.component}
          </ProCard>
        ))}
      </ProForm>
    </PageContainer>
  )
}

export default InsurancePolicyCard
