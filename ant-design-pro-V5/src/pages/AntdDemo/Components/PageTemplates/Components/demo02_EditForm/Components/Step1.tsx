/**
 * 第一頁 基本資料輸入
 * 變數透過 mobx 管理，可以減少資料傳遞的麻煩
 */

import React, { useEffect, useRef } from 'react'
import { Button } from 'antd'
import { observer } from 'mobx-react'
import basicStore from '../Mobx/basicStore'
import { FooterToolbar, ProForm, ProFormDatePicker, ProFormInstance, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import dayjs from 'dayjs'
import optionsStore from '../Mobx/optionStore'
import { MliFormRow } from '@mli-csmo/base'
import { parseRocDate } from '@/utils/rocDateUtils'
import { useNavigate } from '@umijs/max'

interface Props {
  handleStep: (step: number) => void
}

const Step1Form: React.FC<Props> = ({ handleStep }) => {
  const formRef = useRef<ProFormInstance>()
  const chgTypeOption = optionsStore.getOptions('chgType')
  const navigate = useNavigate()

  useEffect(() => {
    // 資料初始化
    basicStore.initBasic()
    // 取得初始資料
    const data = basicStore.getBasic
    // 將日期欄位轉成 dayjs 物件
    const values = {
      ...data,
      receiveDate: data.receiveDate ? dayjs(data.receiveDate) : undefined,
      chgDate: data.chgDate ? dayjs(data.chgDate) : undefined
    }
    // 資料保存
    formRef.current?.setFieldsValue(values)
  })

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
      <MliFormRow>
        <ProFormText
          name="policyNo"
          label="保單號碼"
          placeholder=' '
          colSize={1}
          rules={[{ required: true }]}
        />
        <ProFormText
          name="receiveNo"
          label="受理號碼"
          placeholder=' '
          colSize={1}
          rules={[{ required: true }]}
          fieldProps={{
            onChange: (e) => {
              // 強制將值設為大寫
              const upperCaseValue = e.target.value.toUpperCase()
              formRef.current?.setFieldsValue({ receiveNo: upperCaseValue })
            }
          }}
        />
        <ProFormDatePicker
          name='receiveDate'
          label='受理日期'
          placeholder=' '
          colSize={2 / 3}
          rules={[
            { required: true, message: '日期為必填項' }
          ]}
          fieldProps={{
            format: 'TTT/MM/DD',
            style: { width: '100%' },
            onBlur: (e: any) => {
              if (e.target?.value) {
                formRef.current?.setFieldValue('receiveDate', parseRocDate(e.target?.value))
              }
            }
          }}
        />
        <ProFormDatePicker
          name='chgDate'
          label='變更生效日'
          placeholder=' '
          colSize={2 / 3}
          rules={[
            { required: true, message: '日期為必填項' }
          ]}
          fieldProps={{
            format: 'TTT/MM/DD',
            style: { width: '100%' },
            onBlur: (e: any) => {
              if (e.target?.value) {
                formRef.current?.setFieldValue('chgDate', parseRocDate(e.target?.value))
              }
            }
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

      <FooterToolbar>
        <Button type="primary" onClick={handleSubmit}>繼續</Button>
        <Button danger onClick={() => {
          navigate('/antdDemo/demo/PageTemplates?activeKey=EditForm')
        }}>取消</Button>
      </FooterToolbar>
    </ProForm>
  )
}

export default observer(Step1Form)
