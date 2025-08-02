import React, { useRef, useState } from 'react'
import { ProTable, ActionType, ProColumns, ProCard, FooterToolbar } from '@ant-design/pro-components'
import { Button, message } from 'antd'
import EditableDetailForm from './Components/EditableDetailForm'
import { observer } from 'mobx-react'
import poTableStore, { PoTable } from '../../Mobx/poTableStore'

const TabContent2: React.FC = () => {
  const actionRef = useRef<ActionType>() // 表格操作參考（非必要但可用於刷新）
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create') // 控制新增或編輯模式
  const [editableRow, setEditableRow] = useState<PoTable | undefined>() // 目前正在編輯的資料列

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

  // 自訂送出區域（底部工具列）
  const submitterRender = () => ({
    render: () => (
      <FooterToolbar>
        <Button
          type='primary'
          onClick={() => {
            // 可以從 MobX store 拿資料提交
            console.log('儲存資料', poTableStore.getPoTableList)
            message.success('表單提交成功！')
          }}
          key='save'
        >
          確認
        </Button>
        <Button
          onClick={() => {
            // 執行取消操作
            message.warning('取消作業')
          }}
        >
          取消
        </Button>
      </FooterToolbar>
    )
  })

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
