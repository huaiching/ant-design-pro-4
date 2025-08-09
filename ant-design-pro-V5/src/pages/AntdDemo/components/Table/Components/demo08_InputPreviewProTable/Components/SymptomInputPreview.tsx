import React, { useState } from 'react'
import { AutoComplete, Button, message, Popconfirm } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { ProTable, ProColumns, ProForm } from '@ant-design/pro-components'
import { MliFormRow } from '@/common'

interface SymptomInputPreviewProps {
  // 可選的症狀清單資料（代碼 + 文字）
  optionsData: { code: string; text: string }[]
  // 當子頁面資料有變更時回傳給父頁面
  onChange?: (data: { code: string; text: string }[]) => void
}

/**
 * 子頁面元件
 * 功能：提供「輸入症狀」並顯示已選症狀清單
 * 不包含 FooterToolbar，按鈕邏輯由父頁面控制
 */
const SymptomInputPreview: React.FC<SymptomInputPreviewProps> = ({
  optionsData,
  onChange
}) => {
  // 使用者輸入框的文字
  const [inputValue, setInputValue] = useState('')
  // 已選取的症狀資料
  const [selectedOptions, setSelectedOptions] = useState<{ code: string; text: string }[]>([])

  /**
   * 新增症狀到已選清單
   */
  const handleAdd = () => {
    // 從 optionsData 找出符合輸入值的項目
    const found = optionsData.find((item) => `${item.code} ${item.text}` === inputValue)
    if (!found) {
      message.error('輸入資料不存在')
      return
    }

    // 檢查是否重複
    if (selectedOptions.some((item) => item.code === found.code)) {
      message.warning('資料已存在')
      return
    }

    // 更新已選清單
    const newData = [...selectedOptions, found]
    setSelectedOptions(newData)
    // 將最新資料回傳給父頁面
    onChange?.(newData)
    // 清空輸入框
    setInputValue('')
  }

  /**
   * 刪除已選症狀
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
    .map((item) => ({
      value: `${item.code} ${item.text}`
    }))

  /**
   * 表格欄位定義
   */
  const columns: ProColumns<{ code: string; text: string }>[] = [
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
    { title: '代碼', dataIndex: 'code', valueType: 'text' },
    { title: '文字', dataIndex: 'text', valueType: 'text' }
  ]

  return (
    <MliFormRow>
      <ProForm.Item label="症狀" name="symptom" layout="vertical">
        {/* 症狀輸入框（AutoComplete） */}
        <AutoComplete
          style={{ width: 240 }}
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

        {/* 顯示已選清單（ProTable） */}
        {selectedOptions.length > 0 && (
          <ProTable
            headerTitle="輸入結果"
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
    </MliFormRow>
  )
}

export default SymptomInputPreview
