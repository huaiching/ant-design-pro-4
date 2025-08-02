/**
 * 給 ProFrom 使用的 formRef 設定
 */

import { makeAutoObservable } from 'mobx'
import type { ProFormInstance } from '@ant-design/pro-components'

class FormRefStore {
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

const formRefStore = new FormRefStore()
export default formRefStore
