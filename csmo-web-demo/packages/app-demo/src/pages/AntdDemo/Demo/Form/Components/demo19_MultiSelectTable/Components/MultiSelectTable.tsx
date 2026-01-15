import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { ProColumns, ProForm, ProFormInstance, ProTable } from '@ant-design/pro-components'
import { AutoComplete, Button, message, Popconfirm, Space } from 'antd'
import React, { useEffect, useState } from 'react'

interface OptionData {
  code: string
  [key: string]: any
}

interface Props {
  /** 下拉選單的來源資料，第一個欄位必須是 code */
  optionsData: OptionData[]

  /** ProForm.Item 的標籤文字 */
  label: string

  /** 對應 ProForm.Item 的欄位名稱，用於保存輸入結果 */
  name: string

  /** 額外的表格欄位設定，會動態合併進 ProTable columns */
  column?: any[]

  /** AutoComplete 的 placeholder 提示文字 */
  placeholder?: string

  /** 綁定外部 ProForm 的 formRef，用於同步 selectedOptions 值 */
  formRef?: React.MutableRefObject<ProFormInstance | undefined>

  /** 是否必填，若為 true 則會檢核至少需輸入一筆資料 */
  required?: boolean

  /** 按鈕類型，true 表示顯示新增按鈕，false 表示不顯示 */
  buttonType?: true | false

  /** 資料異動函式 */
  onChange?: (value: any) => void

  /**
   * 自訂檢核函式
   * @param value 目前已選取的資料陣列
   * @returns string | undefined | Promise<string | undefined>
   *          - 回傳 string：檢核錯誤訊息
   *          - 回傳 null | undefined：檢核通過
   */
  validator?: (value: any[]) => Promise<void>
}

/**
 * 自製元件，可用於輸入多筆資料 (每筆資料有多個欄位)
 * @param optionsData 下拉選單資料來源 (必須包含 code 欄位)
 * @param label       ProForm.Item 標籤文字
 * @param name        ProForm.Item 欄位名稱
 * @param column      額外表格欄位設定
 * @param placeholder AutoComplete 提示文字
 * @param formRef     外部 ProForm formRef，用於值同步
 * @param required    是否必填，預設 false
 * @param onChange    資料異動函式
 * @param validator   自訂檢核函式
 */
const MultiSelectTable: React.FC<Props> = ({
  optionsData,
  label,
  name,
  column,
  placeholder = '請選擇',
  formRef,
  required = false,
  buttonType = false,
  onChange,
  validator
}) => {
  const [inputValue, setInputValue] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<any[]>([])

  // ，從 formRef 取出資料
  useEffect(() => {
    if (!formRef?.current) return
    const value = formRef.current.getFieldValue(name)
    setSelectedOptions(Array.isArray(value) ? value : [])
  }, [formRef?.current, formRef?.current?.getFieldValue(name)])

  // 集中處理狀態與同步
  const syncChange = (newSelected: any[]) => {
    setSelectedOptions(newSelected)
    formRef?.current?.setFieldValue(name, newSelected)
    onChange && onChange(newSelected)
  }

  /** 新增資料 */
  const handleAdd = (currentInput: string) => {
    const found = optionsData.find((item) => Object.values(item).join(' ') === currentInput)
    if (!found) {
      message.error('找不到對應的資料')
      return
    }
    if (selectedOptions.some((item) => item.code === found.code)) {
      message.warning('資料已存在')
      setInputValue('');
      return
    }
    syncChange([...selectedOptions, found])
    setInputValue('')
  }

  /** 刪除資料 */
  const handleDelete = (code: string) => {
    syncChange(selectedOptions.filter((item) => item.code !== code))
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
        <Popconfirm key="delete" title="確認刪除？" onConfirm={() => handleDelete(record.code)}>
          <Button icon={<DeleteOutlined />} danger type="link" />
        </Popconfirm>
      ]
    }
  ]
  column?.forEach((e) => columns.push(e))

  /** 驗證規則 */
  const rules = [
    ...(required
      ? [
        {
          validator: async (_: any, value: any[]) => {
            if (!value || value.length === 0) {
              return Promise.reject(new Error(`${label} 為必填欄位`))
            }
            return Promise.resolve()
          }
        }
      ]
      : []),
    ...(validator
      ? [
        {
          validator: async (_: any, value: any[]) => {
            return validator(value) // 直接回傳外部 Promise
          }
        }
      ]
      : [])
  ]

  return (
    <ProForm.Item label={label} name={name} layout="vertical" required={!!required} rules={rules}>
      <>
        <Space.Compact style={{ width: '100%' }}>
          <AutoComplete
            options={autoOptions}
            value={inputValue}
            placeholder={placeholder}
            onChange={(value)=> {
              setInputValue(value)
              if (!buttonType) {
                handleAdd(value)
              }
            }}
          />
          {buttonType && (
            <Button color="primary" variant="filled" icon={<PlusOutlined />} onClick={() => handleAdd(inputValue)} />
          )}
        </Space.Compact>

        {selectedOptions.length > 0 && (
          <ProTable
            rowKey="code"
            columns={columns}
            dataSource={selectedOptions}
            size="small"
            search={false}
            options={false}
            pagination={false}
            toolBarRender={false}
          />
        )}
      </>
    </ProForm.Item>
  )
}

export default MultiSelectTable
