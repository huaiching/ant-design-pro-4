import { FooterToolbar, PageContainer } from '@ant-design/pro-components'
import ProForm, { ProFormCheckbox, ProFormInstance } from '@ant-design/pro-form'
import { MliFormRow } from '@mli-csmo/base'
import { Button, Input, message, Modal, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

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
                const formRefData = {
                  ...formRef.current?.getFieldsValue(),
                  hobbiesNote: formRef.current?.getFieldValue('hobbiesNote'),
                }
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

  /**
   * 其他選項相關設定
   * 1. 使用 useState 來保存「其他」選項的輸入值
   * 2. 其他 有無勾選的判斷: 有勾選=開放可編輯其他說明；無勾選=關閉其他說明+清空其他說明
   * 3. 其他說明 異動時，要同步更新 formRef
   */
  /** 興趣 **/
  // 其他勾選
  const [hobbiesNote, setHobbiesNote] = useState('')
  // 其他說明 內容
  const [hobbiesOtherInd, setHobbiesOtherInd] = useState<boolean>(true)
  // 其他 有無勾選的判斷
  const hobbiesChange = (list: string[]) => {
    if (!list.includes('4')) {
      setHobbiesOtherInd(true)
      setHobbiesNote('')
    } else {
      setHobbiesOtherInd(false)
    }
  }
  // 資料同步更新
  useEffect(() => {
    formRef.current?.setFieldValue('hobbiesNote', hobbiesNote)
    handleValueChange()
  }, [hobbiesNote]);

  /** 下拉式選單 **/
  const options = [
    { label: '讀書', value: '1' },
    { label: '旅行', value: '2' },
    { label: '運動', value: '3' },
    {
      label: (
        <>
          其他
          <Input
            variant="underlined"
            style={{ width: 150, marginLeft: 8 }}
            value={hobbiesNote}
            placeholder="其他說明"
            onChange={(e) => setHobbiesNote(e.target.value)}
            disabled={hobbiesOtherInd}
          />
        </>
      ),
      value: '4'
    }
  ]

  return (
    <PageContainer>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={false}
        onValuesChange={handleValueChange}
      >
        <MliFormRow>
          <ProFormCheckbox.Group
            colSize={2}
            name="hobbies"
            label="選擇興趣"
            options={options}
            rules={[{ required: true, message: '請選擇至少一個興趣' }]}
            fieldProps={{
              onChange: hobbiesChange // 透過 onChange 觸發 其他內容的控管函式
            }}
          />
        </MliFormRow>
        <Typography.Text type="danger">
          其他 後面使用的 Input 是另外保存的，範例是使用 useState，但實際上可以改成 Mobx
          方便後續抓取。
        </Typography.Text>

        {/* 底部功能區 */}
        <FooterToolbar>
          <Button type='primary' onClick={submitterRender}>送出</Button>
        </FooterToolbar>
      </ProForm>
    </PageContainer>
  )
}

export default MyForm
