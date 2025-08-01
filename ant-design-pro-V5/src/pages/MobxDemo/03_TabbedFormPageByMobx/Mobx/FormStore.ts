// formStore.ts
import { makeAutoObservable } from 'mobx'
import type { ProFormInstance } from '@ant-design/pro-components'

class FormStore {
  formInstance: ProFormInstance | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setFormRef(instance: ProFormInstance | null) {
    this.formInstance = instance
  }

  get getFormRef() {
    return this.formInstance
  }
}

const formStore = new FormStore()
export default formStore
