import { AppstoreOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer, ProForm, ProFormInstance } from '@ant-design/pro-components'
import { Button, FloatButton, Modal, Spin } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react'
import subEditStore from './Mobx/SubEditStroe';
import SubEdit from './Components/SubEdit';

/**
 * 主流程 的 頁面結構範例
 */
const SampleMain: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    // 資料初始化
    initData()
    // 讀取資料
    readData()

    return () => {
      // 離開頁面前的處理
    }
  }, []);

  const initData = () => {
    // 資料初始化: 呼叫 子頁面的 mobx init 方法 進行資料初始化
    subEditStore.init()

  }

  const readData = () => {
    // 讀取資料: 如果需要呼叫 API 取得資料 就在這裡進行
    setLoading(true)
    subEditStore.readData()
    setLoading(false)
  }

  // 控制送出後之動作
  const submitterRender = () => {
    Modal.confirm({
      content: "確定要送出嗎？",
      onOk() {
        // 送出前的處理: 例如表單驗證
        formRef.current?.validateFields().then(() => {
          // 送出後的處理: 例如呼叫 API 儲存資料
          // 儲存成功後的處理: 例如顯示成功訊息、導頁等
        })
      },
      onCancel() {
        // 取消作業
      }
    })
  }

  return (
    <PageContainer
      header={{
        title: false,
        ghost: true
      }}
    >
      <Spin spinning={loading}>
        <ProForm formRef={formRef} submitter={false} layout="vertical">
          {/* 頁面內容 */}
          <SubEdit />

          {/* 浮層功能區 */}
          <FloatButton.Group
            shape="square"
            trigger="click"
            style={{ bottom: 100 }}
            placement="top"
            icon={<AppstoreOutlined />}
          >
            <FloatButton
              icon={<VerticalAlignTopOutlined />}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                })
                const target = document.getElementById('tabContent') || window
                target.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                })
              }}
            />
            <FloatButton
              icon={<VerticalAlignBottomOutlined />}
              onClick={() => {
                window.scrollTo({
                  top: document.documentElement.scrollHeight,
                  behavior: 'smooth'
                })
                const target = document.getElementById('tabContent') || window
                target.scrollTo({
                  top: document.documentElement.scrollHeight,
                  behavior: 'smooth'
                })
              }}
            />
          </FloatButton.Group>

          {/* 底部功能區 */}
          <FooterToolbar>
            <Button>功能按鈕</Button>
            <Button type='primary' onClick={submitterRender}>送出</Button>
          </FooterToolbar>
        </ProForm>
      </Spin>
    </PageContainer>
  )
}

export default observer(SampleMain)
