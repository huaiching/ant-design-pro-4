import React, { useEffect, useState } from 'react'
import { Card } from 'antd'

// 定義接收的 state 參數類型
type LocationState = {
  name?: string
  age?: number
};

const Demo01: React.FC = () => {
  const [params, setParams] = useState<LocationState>({})

  useEffect(() => {
    const data = sessionStorage.getItem('params')
    if (data) {
      setParams(JSON.parse(data))
    }
  }, [])

  return (
    <Card title="接收的參數">
      <p>姓名: {params.name}</p>
      <p>年齡: {params.age}</p>
    </Card>
  )
}

export default Demo01
