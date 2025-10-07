/**
 * 輸入使用者資訊，保存到 useSyncExternalStore 全域變數中
 */
import React, { useEffect, useRef } from 'react'
import { ProForm, ProFormText, ProFormDigit, ProFormInstance, ProFormDatePicker } from '@ant-design/pro-components'
import { Button, Card, message } from 'antd'
import { useSyncExternalStore } from 'react'
import { UserInfo, userStore } from '../Store/userStore'
import { MliFormRow } from '@/common/base'
import { parseRocDate } from '@/utils/rocDateUtils'
import dayjs from 'dayjs'

const Create: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  // 訂閱 user 狀態
  const user = useSyncExternalStore(
    userStore.subscribe,  // 訂閱
    userStore.getUser,    // 客戶端取值
    userStore.getUser     // 伺服器端取值
  )

  // 資料初始化
  useEffect(() => {
    // 變數初始化
    userStore.init()
    // 日期格式轉換
    const data = {
      ...user, 
      calcDate: dayjs(user.calcDate, 'TTT/MM/DD').isValid() ? dayjs(user.calcDate, 'TTT/MM/DD') : null
    }
    // formRef 資料同步
    formRef.current?.setFieldsValue(data)
  }, [])

  // 資料同步函式
  const onValuesChange = (value: any) => {
    const data = {
      ...user,
      ...value
    }
    userStore.setUser(data)
  }

  return (
    <Card title="輸入使用者資料" bordered={false}>
      <ProForm
        grid
        layout="vertical"
        formRef={formRef}
        submitter={false}
        onValuesChange={onValuesChange}
      >
        <MliFormRow>
          <ProFormText
            name="name"
            label="姓名"
            placeholder=""
          />
          <ProFormDigit
            name="age"
            label="年齡"
            placeholder=""
          />
          <ProFormText
            name="email"
            label="Email"
            placeholder=""
          />
          <ProFormDatePicker
            name="calcDate"
            label="計算日"
            placeholder=""
            fieldProps={{
              format: 'TTT/MM/DD',
              style: { width: '100%' },
              onBlur: (e: any) => {
                if (e.target?.value) {
                  const date = parseRocDate(e.target?.value)
                  formRef.current?.setFieldValue('calcDate', date)
                  onValuesChange({
                    calcDate: dayjs(date).format('TTT/MM/DD')
                  })
                }
              }
            }}
          />
        </MliFormRow>
      </ProForm>
    </Card>
  )
}

export default Create