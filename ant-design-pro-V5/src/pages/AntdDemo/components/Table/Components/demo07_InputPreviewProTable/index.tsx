import React, { useState } from 'react'
import { AutoComplete, Button, Space, message, Popconfirm } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { ProTable, ProColumns } from '@ant-design/pro-components'
import MliFormRow from '@/common/components/form/MliFormRow'
import MliFormCol from '@/common/components/form/MliFormCol'

// 可選資料列表（代碼 + 文字）
const optionsData = [
  { code: 'A01', text: '頭暈' },
  { code: 'B02', text: '咳嗽' },
  { code: 'C03', text: '喉嚨痛' },
  { code: 'D04', text: '發燒' },
  { code: 'E05', text: '流鼻水' }
]

const SamplePage: React.FC = () => {
  // 使用者輸入框的值
  const [inputValue, setInputValue] = useState('')

  // 已選取的項目清單
  const [selectedOptions, setSelectedOptions] = useState<{ code: string; text: string }[]>([])

  // 處理新增按鈕邏輯
  const handleAdd = () => {
    // 從 optionsData 找出符合輸入值的項目
    const found = optionsData.find((item) => `${item.code} ${item.text}` === inputValue)

    if (!found) {
      message.error('輸入資料不存在') // 顯示錯誤訊息
      return
    }

    // 檢查是否已經選過此項目
    const exists = selectedOptions.some((item) => item.code === found.code)
    if (exists) {
      message.warning('資料已存在') // 顯示警告訊息
      return
    }

    // 加入選項並清空輸入框
    setSelectedOptions([...selectedOptions, found])
    setInputValue('')
  }

  // 處理刪除按鈕邏輯
  const handleDelete = (code: string) => {
    setSelectedOptions((prev) => prev.filter((item) => item.code !== code))
  }

  // 自動完成選單選項
  const autoOptions = optionsData
    .filter((item) => !selectedOptions.find((sel) => sel.code === item.code)) // 排除已選取的
    .map((item) => ({
      value: `${item.code} ${item.text}`, // 顯示為 "代碼 文字"
    }))

  // ProTable 欄位定義
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
        </Popconfirm>,
      ],
    },
    {
      title: '代碼', 
      dataIndex: 'code',
      valueType: 'text'
    },
    {
      title: '文字',
      dataIndex: 'text',
      valueType: 'text'
    },
  ]

  return (
    <MliFormRow>
      <MliFormCol colSize={1.5}>
        {/* 輸入區：輸入 + 新增按鈕 */}
        <Space style={{ marginBottom: 16 }}>
          <AutoComplete
            style={{ width: 240 }}     // 寬度設定
            options={autoOptions}      // 自動完成選項
            value={inputValue}         // 綁定輸入值
            onChange={(val) => setInputValue(val)}   // 處理輸入變更
            placeholder="請輸入或選擇"                // 提示文字
            // 自訂過濾邏輯（忽略大小寫）
            filterOption={(inputValue, option) =>
              !!option && option.value.toLowerCase().includes(inputValue.toLowerCase())
            } 
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增
          </Button>
        </Space>

        {/* 顯示區：使用 ProTable 顯示已選項目 */}
        {selectedOptions.length > 0 && (
          <ProTable
            headerTitle="輸入結果"        // 表格標題
            search={false}               // 不顯示搜尋欄
            options={false}              // 不顯示設定按鈕
            pagination={false}           // 不顯示分頁
            toolBarRender={false}        // 不顯示工具欄
            dataSource={selectedOptions} // 表格資料來源
            columns={columns}            // 欄位定義
            rowKey="code"                // 唯一鍵
          />
        )}
      </MliFormCol>
    </MliFormRow>
  )
}

export default SamplePage
