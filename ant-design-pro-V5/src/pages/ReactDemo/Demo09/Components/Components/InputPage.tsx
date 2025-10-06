// InputPage.tsx
import React, { useState } from 'react'
import { Input, Button, Card } from 'antd'
import { store } from '../Store/store'

const InputPage: React.FC = () => {
  const [value, setValue] = useState('')

  const handleSave = () => {
    store.setData(value)
  }

  return (
    <Card title="輸入資料頁">
      <Input
        placeholder="請輸入內容"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: 300, marginRight: 8 }}
      />
      <Button type="primary" onClick={handleSave}>
        儲存
      </Button>
    </Card>
  )
}

export default InputPage
