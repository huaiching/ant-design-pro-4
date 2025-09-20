import React, { useState } from 'react'
import { AutoComplete, Button, message, Popconfirm, Space } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { ProTable, ProColumns, ProForm } from '@ant-design/pro-components'
import { MliFormCol, MliFormRow } from '@mli-csmo/base'

interface SymptomInputPreviewProps {
  optionsData: any[]
  onChange?: (data: { code: string; text: string }[]) => void
  colSize?: number
  label?: string
  name?: string
  column?: any[]
}

/**
 * 自製元件，可用於 輸入多筆資料 (每筆資料有多個欄位)
 */
const SymptomInputPreview: React.FC<SymptomInputPreviewProps> = ({
  optionsData, onChange, colSize, label, name, column
}) => {
  // 使用者輸入框的文字
  const [inputValue, setInputValue] = useState('')
  // 已選取的資料
  const [selectedOptions, setSelectedOptions] = useState<{ code: string; text: string }[]>([])

  /**
   * 新增資料到清單
   */
  const handleAdd = () => {
    // 找出符合輸入值的項目 (自動拼接比較)
    const found = optionsData.find(
      (item) => Object.values(item).join(' ') === inputValue
    )

    if (!found) {
      message.error('輸入資料不存在')
      return
    }

    // 檢查是否重複 (以 code 為唯一鍵)
    if (selectedOptions.some((item) => item.code === found.code)) {
      message.warning('資料已存在')
      return
    }

    const newData = [...selectedOptions, found]
    setSelectedOptions(newData)
    onChange?.(newData)
    setInputValue('')
  }


  /**
   * 刪除資料
   */
  const handleDelete = (code: string) => {
    const newData = selectedOptions.filter((item) => item.code !== code)
    setSelectedOptions(newData)
    onChange?.(newData)
  }

  /**
   * 自動完成選單選項
   * 過濾掉已經選過的項目
   */
  const autoOptions = optionsData
    .filter((item) => !selectedOptions.find((sel) => sel.code === item.code))
    .map((item) => {
      // 取出所有屬性值，轉成字串陣列，再用空格連接
      const displayValue = Object.values(item).join(' ')
      return { value: displayValue }
    })

  /**
   * 表格欄位定義
   */
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
  column?.forEach((e) => {
    columns.push(e)
  })

  return (
    <MliFormRow>
      <MliFormCol colSize={colSize ? colSize : 1}>
        <ProForm.Item label={label} name={name} layout="vertical">
          {/* 輸入框（AutoComplete） */}
          <Space.Compact style={{ width: '100%' }}>
            <AutoComplete
              options={autoOptions}
              value={inputValue}
              onChange={(val) => setInputValue(val)}
              placeholder="請輸入或選擇"
              filterOption={(inputValue, option) =>
                !!option && option.value.toLowerCase().includes(inputValue.toLowerCase())
              }
            />
            {/* 新增按鈕 */}
            <Button shape="default" icon={<PlusOutlined />} onClick={handleAdd} />
          </Space.Compact>

          {/* 顯示已選清單（ProTable） */}
          {selectedOptions.length > 0 && (
            <ProTable
              search={false}       // 關閉搜尋功能
              options={false}      // 關閉表格設定按鈕
              pagination={false}   // 關閉分頁
              toolBarRender={false} // 關閉工具列
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
