import React, { useState } from 'react'
import { Steps, Card, message, Modal } from 'antd'
import { PageContainer, FooterToolbar } from '@ant-design/pro-components'
import Step1Form from './Components/Step1'
import Step2Form from './Components/Step2'
import basicStore from './Mobx/basicStore'

const ChangeFormIndex: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)


  /**
   * 步驟跳轉
   * @param step 要前往的步驟
   */
  const handleStep = (step: number) => {
    // 前往指定頁面
    setCurrentStep(step)
  }

  return (
    <>
      {currentStep === 0 && <Step1Form handleStep={handleStep} />}
      {currentStep === 1 && <Step2Form handleStep={handleStep} />}
    </>
  )
}

export default ChangeFormIndex
