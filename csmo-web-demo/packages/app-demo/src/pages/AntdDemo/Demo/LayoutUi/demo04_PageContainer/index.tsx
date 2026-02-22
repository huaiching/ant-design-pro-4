import { DownOutlined } from '@ant-design/icons'
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { Button, Dropdown, message, Modal } from 'antd'
import React, { useEffect, useRef } from 'react'
import DropdownMenu from './Components/dropdownMenu'
import ModalFormMenu from './Components/modalFormMenu'
import { MliFormRow } from '@mli-csmo/base'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  // 初始載入時的設定
  useEffect(() => {
    // 讀取資料
    // ...

    // 離開頁面前的處理
    return () => {
      // 離開頁面前先將資料塞回 mobx
      handleValueChange()
    }
  }, []);

  // 表單值變更處理: 同步更新 Mobx 資料
  const handleValueChange = () => {
    const values = formRef.current?.getFieldsValue()
    // 呼叫 Mobx 的 setting
  }

  // 控制送出後之動作
  const submitterRender = () => {
    Modal.confirm({
      content: "確定要送出嗎？",
      onOk() {
        formRef.current?.validateFields().then(() => {
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

  return (
    <PageContainer
      title='PageContainer & Dropdown'    // 標題
      extra={[
        <ModalFormMenu key='p1' />,
        <Dropdown
          key='p2'
          placement='bottom'            // 展開方向: 向下展開
          trigger={['hover']}           // 展開方式: 按下後展開
          destroyPopupOnHide={true}     // 關閉後銷毀，可避免 焦點停留在 下拉選單的 menu 上
          overlay={(                    // 設定展開的menu
            <DropdownMenu />
          )}
        >
          {/* 定義 下拉菜單 的 按鈕，<DownOutlined/> 是 向下箭頭的icon */}
          <Button type='link'> 下拉菜單 <DownOutlined /> </Button>
        </Dropdown>
      ]
      }
    >
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={false}
      >
        <MliFormRow>
          <ProFormText
            name='email'
            label='電子郵件'
            tooltip='這是用戶電子郵件'
            placeholder='請輸入電子郵件'
            rules={[
              {
                required: true,
                message: '必填'
              }
            ]}
          />
        </MliFormRow>

        {/* 底部功能區 */}
        <FooterToolbar>
          <Button type='primary' onClick={submitterRender}>送出</Button>
        </FooterToolbar>
      </ProForm>
    </PageContainer>
  )
}

export default MyForm
