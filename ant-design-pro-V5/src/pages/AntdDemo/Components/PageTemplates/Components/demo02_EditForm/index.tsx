import React, { useEffect, useState } from 'react'
import Step1Form from './Components/Step1'
import Step2Form from './Components/Step2'
import optionsStore from './Mobx/optionStore'
import { observer } from 'mobx-react'

const EditForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)

  // 載入 option
  useEffect(() => {
    optionsStore.setOptions('chgType', [
            { label: '0 首期契變', value: '0' },
            { label: '1 一般契變', value: '1' },
            { label: '2 復效', value: '2' }
          ])
  }, [])

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

export default observer(EditForm)
