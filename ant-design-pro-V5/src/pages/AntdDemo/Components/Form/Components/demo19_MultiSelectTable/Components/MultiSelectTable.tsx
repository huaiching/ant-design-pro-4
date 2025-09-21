import React, { useState, useEffect } from 'react'
import { AutoComplete, Button, message, Popconfirm, Space } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { ProTable, ProColumns, ProForm, ProFormInstance } from '@ant-design/pro-components'
import { MliFormCol, MliFormRow } from '@mli-csmo/base'


interface OptionData {
  code: string
  [key: string]: any
}

interface Props {
  /** 下拉選單的來源資料，第一個欄位必須是 code */
  optionsData: OptionData[]

  /** 欄位在表單中的佔比 (對應 MliFormCol.colSize)，預設 1 */
  colSize?: number

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

  /**
   * 自訂檢核函式
   * @param value 目前已選取的資料陣列
   * @returns string | undefined | Promise<string | undefined>
   *          - 回傳 string：檢核錯誤訊息
   *          - 回傳 null | undefined：檢核通過
   */
  validator?: (value: any[]) => string | null | undefined | Promise<string | null | undefined>
}

/**
 * 自製元件，可用於輸入多筆資料 (每筆資料有多個欄位)
 * @param optionsData 下拉選單資料來源 (必須包含 code 欄位)
 * @param colSize     元件在表單中的佔比 (MliFormCol)
 * @param label       ProForm.Item 標籤文字
 * @param name        ProForm.Item 欄位名稱
 * @param column      額外表格欄位設定
 * @param placeholder AutoComplete 提示文字
 * @param formRef     外部 ProForm formRef，用於值同步
 * @param required    是否必填，預設 false
 * @param validator   自訂檢核函式
 */
const MultiSelectTable: React.FC<Props> = ({
  optionsData, colSize, label, name, column, placeholder, formRef, required, validator
}) => {
  const [inputValue, setInputValue] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<any[]>([])

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

  /** 驗證規則 */
  const rules = [
    ...(required
      ? [{
          validator: async (_: any, value: any[]) => {
            if (!value || value.length === 0) {
              return Promise.reject(new Error(`${label}為必填`))
            }
            return Promise.resolve()
          }
        }]
      : []),
    ...(validator
      ? [{
          validator: async (_: any, value: any[]) => {
            const msg = await validator(value)
            if (msg) {
              return Promise.reject(new Error(msg))
            }
            return Promise.resolve()
          }
        }]
      : [])
  ]

  return (
    <MliFormRow>
      <MliFormCol colSize={colSize ?? 1}>
        <ProForm.Item
          label={label}
          name={name}
          layout="vertical"
          required={required ? true : false}
          rules={rules}
        >
          <>
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
          </>
        </ProForm.Item>
      </MliFormCol>
    </MliFormRow>
  )
}

export default MultiSelectTable
