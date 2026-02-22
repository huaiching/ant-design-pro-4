import ProCard from '@ant-design/pro-card'
import ProForm, { ProFormInstance } from '@ant-design/pro-form'
import { Button, message, Modal, Segmented, Space, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { CloseOutlined, FormOutlined } from '@ant-design/icons'
import PoEdit from './Components/PoEdit'
import { poDataApi } from './Store/dataApi'

const editOption = [
  { value: 'edit', icon: <FormOutlined style={{ color: 'blue' }} /> },
  { value: 'disabled', icon: <CloseOutlined style={{ color: 'red' }} /> }
]

// const initData = {
//   policyNo: '1234567890',
//   poStsCode: '42'
// }

const InsurancePolicyCard: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  // 初始載入時的設定
  useEffect(() => {
    // 讀取資料
    initData()

    // 離開頁面前的處理
    return () => {
      // 離開頁面前先將資料塞回 mobx
      handleValueChange()
    }
  }, []);

  // 資料初始化: 呼叫 子頁面的 mobx init 方法 進行資料初始化
  const initData = async () => {
    // 保單資訊
    const poData = await poDataApi()
    const data = {
      change: false,
      poData: poData
    }
    formRef.current?.setFieldValue('poChange', data)
  }

  // 表單值變更處理: 同步更新 Mobx 資料
  const handleValueChange = () => {
    const poChangeValue = formRef.current?.getFieldValue('poChange')
    // 呼叫 Mobx 的 setting
  }

  /**
   * 卡片編輯設定
   */
  //** 保單 **/
  // 編輯開關: 鎖定.disabled | 編輯.edit
  const [poEdit, setPoEdit] = useState<string>('disabled') 
  useEffect(() => {
    const poChangeValue = formRef.current?.getFieldValue('poChange')
    switch (poEdit) {
      case 'disabled':
        formRef.current?.setFieldValue('poChange', {
          ...poChangeValue,
          change: false
        })
        break
      case 'edit':
        formRef.current?.setFieldValue('poChange', {
          ...poChangeValue,
          change: true
        })
        break
    }
  }, [poEdit]);

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
    Modal.confirm({
      content: "確定要送出嗎？",
      onOk() {
        formRef.current?.validateFields().then(() => {
          const poChangeValue = formRef.current?.getFieldValue('poChange')
          console.log('poChange', poChangeValue);
          const formRefData = formRef.current?.getFieldsValue()
          console.log('表單數據', formRefData);

          message.success('表單提交成功！')
        })
      },
      onCancel() {
        // 取消按鈕 點擊後 要進行的 API 操作
        message.warning('取消作業')
      }
    })
  }

  // 卡片清單內容
  const cardConfigs = [
    {
      key: 'poChange',
      title: '保單資訊',
      dataColumn: 'poData',
      init: formRef.current?.getFieldValue('poChange').poData,
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
        submitter={false}
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
                      formRef.current?.setFieldValue([config.key, config.dataColumn], config.init)
                    }
                    // 狀態修改
                    config.setEdit(value)
                  }}
                />
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

        {/* 底部功能區 */}
        <FooterToolbar>
          <Button type='primary' onClick={submitterRender}>送出</Button>
        </FooterToolbar>
      </ProForm>
    </PageContainer>
  )
}

export default InsurancePolicyCard
