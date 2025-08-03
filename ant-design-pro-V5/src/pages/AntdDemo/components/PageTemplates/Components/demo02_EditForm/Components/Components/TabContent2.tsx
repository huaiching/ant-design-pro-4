/**
 * 第二個頁簽 - 示範 ProTable 的 資料處理
 * 因為 ProTable 的資料 不會跟 formRef 進行綁定
 * 透過 mobx 來設定資料 可以免除 無手動同步資料時 跨頁資料消失的問題
 */

import React, { useEffect, useRef, useState } from 'react'
import { ProTable, ActionType, ProColumns, ProCard, FooterToolbar } from '@ant-design/pro-components'
import { Button, message } from 'antd'
import EditableDetailForm from './Components/EditableDetailForm'
import { observer } from 'mobx-react'
import poTableStore, { PoTable } from '../../Mobx/poTableStore'
import formRefStore from '../../Mobx/formRefStore'
import tabRefStore from '../../Mobx/tabRefStore'

const TabContent2: React.FC = () => {
  const formRef = formRefStore.getFormRef
  const actionRef = useRef<ActionType>() // 表格操作參考（非必要但可用於刷新）
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create') // 控制新增或編輯模式
  const [editableRow, setEditableRow] = useState<PoTable | undefined>() // 目前正在編輯的資料列

  useEffect(() => {
    // 註冊 tab1 的切換前事件，做表單驗證
    tabRefStore.setTabLeaveFn('tab2', async () => {
      message.info('Tab2 切換')
      const valid = await formRef.current?.validateFields()
      if (valid) {
        return true
      } else {
        message.error('Tab2 欄位未完成')
        return false
      }
    })
    // 👉 註冊進入頁籤事件
    tabRefStore.setTabEnterFn('tab2', () => {
      message.info('進入 Tab2')
    })
  }, [])

  // 定義表格欄位
  const columns: ProColumns<PoTable>[] = [
    { title: '保單號碼', dataIndex: 'policyNo', valueType: 'text' },
    { title: '保單狀態', dataIndex: 'poStsCode', valueType: 'text' },
    { title: '主約險種代碼', dataIndex: 'basicPlanCode', valueType: 'text' },
    { title: '主約險種版數', dataIndex: 'basicRateScale', valueType: 'text' },
  ]

  // 儲存按鈕事件處理（新增或更新）
  const handleSave = (updated: PoTable) => {
    if (formMode === 'edit') {
      // 編輯模式：更新資料
      poTableStore.updatePoTable(updated)
      message.success('修改成功')
    } else {
      // 新增模式：加入新資料
      poTableStore.addPoTable(updated)
      message.success('新增成功')
    }
    // 關閉編輯表單
    setEditableRow(undefined)
  }

  return (
    <ProCard ghost>
      <ProTable<PoTable>
        columns={columns} // 表格欄位
        dataSource={poTableStore.getPoTableList} // 使用 MobX 資料
        actionRef={actionRef}
        rowKey='policyNo'
        search={false}
        pagination={false}
        rowClassName={(record) =>
          record.policyNo === editableRow?.policyNo ? 'ant-table-row-selected' : ''
        }
        onRow={(record) => ({
          // 點選列時觸發編輯模式
          onClick: () => {
            setEditableRow({ ...record })
            setFormMode('edit')
          },
        })}
        toolbar={{
          title: '保單清單',
          actions: [
            <Button
              key='new'
              type='primary'
              onClick={() => {
                // 點選新增按鈕時啟動新增模式
                setEditableRow({} as PoTable)
                setFormMode('create')
              }}
            >
              新增
            </Button>,
          ],
        }}
      />

      {/* 編輯表單區塊，只有在點選編輯或新增時才顯示 */}
      {editableRow && (
        <EditableDetailForm
          mode={formMode}
          initialValues={editableRow}
          onSubmit={handleSave} // 儲存事件
          onCancel={() => setEditableRow(undefined)} // 取消事件
        />
      )}
    </ProCard>
  )
}

export default observer(TabContent2)
