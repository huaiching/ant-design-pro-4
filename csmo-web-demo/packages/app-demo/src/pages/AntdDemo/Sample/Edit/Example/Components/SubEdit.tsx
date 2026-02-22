import { ProForm, ProFormInstance, ProFormText } from "@ant-design/pro-components"
import { observer } from "mobx-react"
import { useEffect, useRef } from "react"
import subEditStore from "../Mobx/SubEditStroe"
import { MliFormRow } from "@mli-csmo/base"

const SubEdit: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  // 初始載入時的設定
  useEffect(() => {
    // 讀取資料
    readData()

    // 離開頁面前的處理
    return () => {
      // 離開頁面前先將資料塞回 mobx
      handleValueChange()
    }
  }, []);

  // mobx 資料異動時的處理
  useEffect(() => {
    // 當 mobx 的資料變更時，將資料帶入表單
    readData()
  }, [subEditStore.getData]);

  // 頁籤初次載入時，將 mobx 的資料帶入
  const readData = () => {
    const data = subEditStore.getData
    formRef.current?.setFieldsValue(data)
  }

  // 表單值變更處理: 同步更新 Mobx 資料
  const handleValueChange = () => {
    const values = formRef.current?.getFieldsValue()
    subEditStore.setData(values)
  }

  return (
    <ProForm
      formRef={formRef} submitter={false} layout="vertical"
      onValuesChange={handleValueChange}
    >
      {/* 頁面內容，依照實際需求進行調整 */}
      <MliFormRow>
        <ProFormText
          name='sampleText'
          label='示範輸入'
        />
      </MliFormRow>
    </ProForm>
  )
}

export default observer(SubEdit)