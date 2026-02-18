/**
 * 第一頁 基本資料輸入
 * 變數透過 mobx 管理，可以減少資料傳遞的麻煩
 */
import {
  FooterToolbar,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText
} from '@ant-design/pro-components'
import { MliFormRow } from '@mli-csmo/base'
import { useLocation, useNavigate } from '@umijs/max'
import { Button, ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import basicStore from '../Mobx/basicStore'
import formRefStore from '../Mobx/formRefStore'
import optionsStore from '../Mobx/optionStore'
import { toUpperProps } from '@/utils/FieldUtil/StringUtil'

interface Props {
  handleStep: (step: number) => void
  state?: any
}

const Step1Form: React.FC<Props> = ({ handleStep, state }) => {
  const formRef = formRefStore.getFormRef
  const chgTypeOption = optionsStore.getOptions('chgType')
  const navigate = useNavigate()

  // 使用 useLocation 來獲取傳遞的 state 參數
  const location = useLocation()
  // 不可編輯判定
  const [disabled, setDisabled] = useState<boolean>(false)
  useEffect(() => {
    // 判斷開頭是否符合
    if (location.pathname.includes('/antdDemo/demo/PageTemplates/Edit')) {
      setDisabled(true)
    }
  }, [location])

  // 查詢模式判斷
  const isQuery = formRef.current?.getFieldValue('isQuery')

  useEffect(() => {
    if (state) {
      // 將日期欄位轉成 dayjs 物件
      const values = {
        ...state,
        receiveDate: state.receiveDate ? dayjs(state.receiveDate, 'TTT/MM/DD') : undefined,
        chgDate: state.chgDate ? dayjs(state.chgDate, 'TTT/MM/DD') : undefined
      }
      // 資料保存
      formRef.current?.setFieldsValue(values)
    }
  }, [])

  // 繼續事件
  const handleSubmit = async () => {
    // 驗證
    const values = await formRef.current?.validateFields()

    // 轉成字串格式（date 轉為 字串）
    const parsedValues = {
      ...values,
      receiveDate: values.receiveDate.format('TTT/MM/DD'),
      chgDate: values.chgDate.format('TTT/MM/DD')
    }
    // 基本資料存檔
    basicStore.setBasic(parsedValues)
    // 步驟跳轉
    handleStep(1)
  }

  return (
    <ProForm formRef={formRef} submitter={false} grid>
      <ConfigProvider componentDisabled={disabled || isQuery}>
        <MliFormRow>
          <ProFormText
            name="policyNo"
            label="保單號碼"
            placeholder=" "
            colSize={1}
            rules={[{ required: true }]}
          />
          <ProFormText
            name="receiveNo"
            label="受理號碼"
            placeholder=" "
            colSize={1}
            rules={[{ required: true }]}
            fieldProps={{
              ...toUpperProps
            }}
          />
          <ProFormDatePicker
            name="receiveDate"
            label="受理日期"
            placeholder=" "
            colSize={2 / 3}
            rules={[{ required: true, message: '日期為必填項' }]}
            fieldProps={{
              format: 'TTT/MM/DD',
              style: { width: '100%' }
            }}
          />
          <ProFormDatePicker
            name="chgDate"
            label="變更生效日"
            placeholder=" "
            colSize={2 / 3}
            rules={[{ required: true, message: '日期為必填項' }]}
            fieldProps={{
              format: 'TTT/MM/DD',
              style: { width: '100%' }
            }}
          />
          <ProFormSelect
            name="chgType"
            label="變更選項"
            colSize={2 / 3}
            options={chgTypeOption}
            rules={[{ required: true }]}
            showSearch
          />
        </MliFormRow>
      </ConfigProvider>

      <FooterToolbar>
        <Button type="primary" onClick={handleSubmit}>
          繼續
        </Button>
        <Button
          danger
          onClick={() => {
            if (location.pathname.includes('/antdDemo/demo/PageTemplates/Edit')) {
              navigate('/antdDemo/demo/PageTemplates?activeKey=SearchForm')
            } else if (location.pathname.includes('/antdDemo/demo/PageTemplates/Create')) {
              navigate('/antdDemo/demo/PageTemplates?activeKey=SearchForm')
            } else if (location.pathname.includes('/antdDemo/demo/PageTemplates/Query')) {
              navigate('/antdDemo/demo/PageTemplates?activeKey=SearchForm')
            } else {
              navigate('/antdDemo/demo/PageTemplates?activeKey=EditForm')
            }
          }}
        >
          取消
        </Button>
      </FooterToolbar>
    </ProForm>
  )
}

export default observer(Step1Form)
