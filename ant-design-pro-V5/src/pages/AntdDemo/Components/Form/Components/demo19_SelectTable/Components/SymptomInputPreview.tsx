import React, { useState, useEffect } from 'react'
import { AutoComplete, Button, message, Popconfirm, Space } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { ProTable, ProColumns, ProForm, ProFormInstance } from '@ant-design/pro-components'
import { MliFormCol, MliFormRow } from '@mli-csmo/base'

interface SymptomInputPreviewProps {
  optionsData: any[]
  colSize?: number
  label: string
  name: string
  column?: any[]
  placeholder?: string
  formRef?: React.MutableRefObject<ProFormInstance | undefined>
}

/**
 * 自製元件，可用於 輸入多筆資料 (每筆資料有多個欄位)
 */
const SymptomInputPreview: React.FC<SymptomInputPreviewProps> = ({
  optionsData, colSize, label, name, column, placeholder, formRef
}) => {
  const [inputValue, setInputValue] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<{ code: string; text: string }[]>([])

  // 初始化時，從 formRef 取出資料 (避免編輯場景丟失資料)
  useEffect(() => {
    if (formRef?.current) {
      const initValue = formRef.current.getFieldValue(name)
      if (initValue && Array.isArray(initValue)) {
        setSelectedOptions(initValue)
      }
    }
  }, [formRef, name])

  // 同步到 ProForm
  useEffect(() => {
    formRef?.current?.setFieldValue(name, selectedOptions)
  }, [selectedOptions, formRef, name])

  /** 新增資料 */
  const handleAdd = () => {
    const found = optionsData.find(
      (item) => Object.values(item).join(' ') === inputValue
    )
    if (!found) {
      message.error('輸入資料不存在')
      return
    }
    if (selectedOptions.some((item) => item.code === found.code)) {
      message.warning('資料已存在')
      return
    }
    setSelectedOptions([...selectedOptions, found])
    setInputValue('')
  }

  /** 刪除資料 */
  const handleDelete = (code: string) => {
    setSelectedOptions(selectedOptions.filter((item) => item.code !== code))
  }

  /** 自動完成選單選項 */
  const autoOptions = optionsData
    .filter((item) => !selectedOptions.find((sel) => sel.code === item.code))
    .map((item) => ({ value: Object.values(item).join(' ') }))

  /** 表格欄位 */
  const columns: ProColumns<any>[] = [
    {
      title: '操作',
      valueType: 'option',
      width: 20,
      render: (_, record) => [
        <Popconfirm
          key="delete"
          title="確認刪除？"
          onConfirm={() => handleDelete(record.code)}
        >
          <Button icon={<DeleteOutlined />} danger type="link" />
        </Popconfirm>
      ]
    },
  ]
  column?.forEach((e) => columns.push(e))

  return (
    <MliFormRow>
      <MliFormCol colSize={colSize ?? 1}>
        <ProForm.Item label={label} name={name} layout="vertical">
          <Space.Compact style={{ width: '100%' }}>
            <AutoComplete
              options={autoOptions}
              value={inputValue}
              onChange={(val) => setInputValue(val)}
              placeholder={placeholder}
              filterOption={(inputValue, option) =>
                !!option && option.value.toLowerCase().includes(inputValue.toLowerCase())
              }
            />
            <Button shape="default" icon={<PlusOutlined />} onClick={handleAdd} />
          </Space.Compact>

          {selectedOptions.length > 0 && (
            <ProTable
              search={false}
              options={false}
              pagination={false}
              toolBarRender={false}
              dataSource={selectedOptions}
              columns={columns}
              rowKey="code"
            />
          )}
        </ProForm.Item>
      </MliFormCol>
    </MliFormRow>
  )
}

export default SymptomInputPreview
