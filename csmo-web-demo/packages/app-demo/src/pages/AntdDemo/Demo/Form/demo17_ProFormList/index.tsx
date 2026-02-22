import React, { useState, useRef, useEffect } from 'react'
import { ProForm, ProFormText, ProFormSelect, ProFormDigit, ProFormList, ProFormInstance } from '@ant-design/pro-form'
import { Button, message, Modal, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ProCard from '@ant-design/pro-card'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { MliFormRow } from '@mli-csmo/base'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>(null)
  const [benfCount, setBenfCount] = useState(0)
    
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

  // 下拉式選單
  const relationshipOptions = [
    { label: '生存受益人', value: 'L' },
    { label: '滿期受益人', value: 'M' },
    { label: '身故受益人', value: 'D' }
  ]

  // 計算數量
  const calcBenfCount = () => {
    const benfList = formRef.current?.getFieldValue('benfList') || []
    setBenfCount(benfList.length)
  }

  return (
    <PageContainer>
      <ProForm
        grid
        formRef={formRef}
        layout='vertical'
        submitter={false}
        onValuesChange={() => {
          calcBenfCount()
          handleValueChange()
        }}
      >
        <Typography.Text >目前受益人數量：{benfCount}</Typography.Text>

        <ProFormList
          name='benfList'
          creatorButtonProps={{
            creatorButtonText: '新增受益人',
            icon: <PlusOutlined />,
            type: 'primary',
            style: { width: '100%' }
          }}
          copyIconProps={false} // 禁用「複製此行」按鈕
          deleteIconProps={false} // 禁用默認的「刪除此行」按鈕
          // deleteIconProps={{         // 自定義 默認的「刪除」按鈕樣式
          //   tooltipText: '刪除',
          //   Icon: RestTwoTone
          // }}
          alwaysShowItemLabel      // 總是顯示項目標籤
        >
          {/* field : 數值資料 */}
          {/* index : 索引值，從 0 開始 */}
          {/* action: 操作方法，add=新增 / remove=刪除 */}
          {/* count : 總筆數 */}
          {(field, index, action, count) => (
            <ProCard
              ghost
              title={`受益人 ${index + 1}`}
              // 自定義「刪除」按鈕
              extra={
                <Button type="primary" danger onClick={() => action.remove(field.name)}>刪除</Button>
              }
            >
              <MliFormRow gutter={[8, 2]} align='bottom' justify='start'>
                <ProFormSelect
                  name='relation'
                  label='關係'
                  options={relationshipOptions}
                  placeholder=' '
                  colSize={1 / 2}
                  rules={[{ required: true, message: '請選擇關係' }]}
                />
                <ProFormText
                  name='clientId'
                  label='受益人證號'
                  placeholder=' '
                  colSize={1 / 2}
                  rules={[{ required: true, message: '請輸入證號' }]}
                  fieldProps={{
                    onBlur: () => {
                      const currentClientId = formRef.current?.getFieldValue(['benfList', index, 'clientId'])
                      if (currentClientId) {
                        const benfList = formRef.current?.getFieldValue('benfList') || []
                        benfList[index].name = `測試${index + 1}`

                        formRef.current?.setFieldsValue({
                          benfList: [...benfList],
                        })
                      }
                    }
                  }}
                />
                <ProFormText
                  name='name'
                  label='姓名'
                  placeholder=' '
                  colSize={1 / 2}
                  rules={[{ required: true, message: '請輸入姓名' }]}
                  readonly
                />
                <ProFormDigit
                  name='position'
                  label='順位'
                  placeholder=' '
                  min={1}
                  colSize={1 / 2}
                  rules={[{ required: true, message: '請輸入順位' }]}
                />
                <ProFormDigit
                  name='percentage'
                  label='比例'
                  placeholder=' '
                  min={0}
                  max={100}
                  colSize={1 / 2}
                  rules={[
                    { required: true, message: '請輸入比例' },
                    { type: 'number', min: 0, max: 100, message: '比例必須在0-100之間' }
                  ]}
                />
              </MliFormRow>
              {/* 設定分隔線，且 最後一筆不要出現分隔線 */}
              {index < count - 1 && <hr />}
            </ProCard>
          )}
        </ProFormList>

        {/* 底部功能區 */}
        <FooterToolbar>
          <Button type='primary' onClick={submitterRender}>送出</Button>
        </FooterToolbar>
      </ProForm>
    </PageContainer>
  )
}

export default MyForm
