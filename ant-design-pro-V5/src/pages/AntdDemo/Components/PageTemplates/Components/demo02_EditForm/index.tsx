import { PageContainer } from '@ant-design/pro-components'
import { useLocation } from '@umijs/max'
import { message } from 'antd'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import Step1Form from './Components/Step1'
import Step2Form from './Components/Step2'
import formRefStore from './Mobx/formRefStore'
import optionsStore from './Mobx/optionStore'

// 定義接收的 state 參數類型
type LocationState = {
  policyNo?: string
  receiveNo?: string
  receiveDate?: string
  chgDate?: string
  chgType?: string
}

const EditForm: React.FC = () => {
  const formRef = formRefStore.getFormRef
  const [currentStep, setCurrentStep] = useState(0)

  // 使用 useLocation 來獲取傳遞的 state 參數
  const location = useLocation()
  const state = location.state as LocationState

  useEffect(() => {
    // 載入 option
    optionsStore.setOptions('chgType', [
      { label: '0 首期契變', value: '0' },
      { label: '1 一般契變', value: '1' },
      { label: '2 復效', value: '2' }
    ])
  }, [])

  // 查詢模式判斷
  let isQuery = false
  // 判斷開頭是否符合
  if (location.pathname.includes('/antdDemo/demo/PageTemplates/Query')) {
    isQuery = true
  }
  formRef.current?.setFieldValue('isQuery', isQuery)

  /**
   * 步驟跳轉
   * @param step 要前往的步驟
   */
  const handleStep = (step: number) => {
    // 前往指定頁面
    setCurrentStep(step)
  }

  return (
    <PageContainer
      header={{
        title: false,
        ghost: true
      }}
    >
      {currentStep === 0 && <Step1Form handleStep={handleStep} state={state} />}
      {currentStep === 1 && <Step2Form handleStep={handleStep} state={state} />}
    </PageContainer>
  )
}

export default observer(EditForm)
