// src/Mobx/formStore.ts
import { makeAutoObservable } from 'mobx'
import { ProFormInstance } from '@ant-design/pro-components'

class FormStore {
  formRef: React.MutableRefObject<ProFormInstance<any> | undefined> = { current: undefined }

  constructor() {
    makeAutoObservable(this)
  }

  setFormRef(ref: ProFormInstance<any> | undefined) {
    this.formRef.current = ref
  }

  get getFormRef() {
    return this.formRef
  }
}

const formStore = new FormStore()
export default formStore
