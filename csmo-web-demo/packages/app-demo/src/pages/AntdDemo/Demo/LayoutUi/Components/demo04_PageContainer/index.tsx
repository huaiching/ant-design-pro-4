import { DownOutlined } from '@ant-design/icons'
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { Button, Dropdown, message } from 'antd'
import React, { useRef } from 'react'
import DropdownMenu from './components/dropdownMenu'
import ModalFormMenu from './components/modalFormMenu'
import { MliFormRow } from '@mli-csmo/base'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

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
    <PageContainer
      title='PageContainer & Dropdown'    // 標題
      extra={[
          <ModalFormMenu key='p1'/>,
          <Dropdown
             key='p2'
            placement='bottom'            // 展開方向: 向下展開
            trigger={['hover']}           // 展開方式: 按下後展開
            destroyPopupOnHide={true}     // 關閉後銷毀，可避免 焦點停留在 下拉選單的 menu 上
            overlay={(                    // 設定展開的menu
              <DropdownMenu/>
            )}
          >
            {/* 定義 下拉菜單 的 按鈕，<DownOutlined/> 是 向下箭頭的icon */}
            <Button type='link'> 下拉菜單 <DownOutlined/> </Button>
          </Dropdown>
        ]
      }
    >
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
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
      </ProForm>
    </PageContainer>
  )
}

export default MyForm
