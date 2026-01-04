/**
 * 輸入使用者資訊，保存到 useSyncExternalStore 全域變數中
 */
import React, { useEffect, useRef } from 'react'
import { ProForm, ProFormText, ProFormDigit, ProFormInstance, ProFormDatePicker } from '@ant-design/pro-components'
import { Typography } from 'antd'
import { useSyncExternalStore } from 'react'
import { userStore } from '../Store/userStore'
import { MliFormRow } from '@mli-csmo/base'
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
    userStore.init()
  }, [])

  // formRef 資料同步
  useEffect(() => {
    const data = {
      ...user,
      calcDate: dayjs(user.calcDate, 'TTT/MM/DD').isValid() ? dayjs(user.calcDate, 'TTT/MM/DD') : null
    }
    formRef.current?.setFieldsValue(data)
  }, [user])


  // 資料同步函式
  const onValuesChange = (value: any) => {
    const data = {
      ...user,
      ...value
    }
    userStore.setUser(data)
  }

  return (
    <ProForm
      grid
      layout="vertical"
      formRef={formRef}
      submitter={false}
      onValuesChange={onValuesChange}
    >
      <Typography.Title level={4}>輸入使用者資料</Typography.Title>
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
          name="address"
          label="地址"
          placeholder=""
        />
        <ProFormDatePicker
          name="calcDate"
          label="計算日"
          placeholder=""
          fieldProps={{
            format: 'TTT/MM/DD',
            style: { width: '100%' },
          }}
        />
      </MliFormRow>
    </ProForm>
  )
}

export default Create
