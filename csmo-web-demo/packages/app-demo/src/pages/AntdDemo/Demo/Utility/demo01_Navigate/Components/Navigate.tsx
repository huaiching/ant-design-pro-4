import React from 'react'
import { useLocation } from '@umijs/max'
import { Card } from 'antd'

// 定義接收的 state 參數類型
type LocationState = {
  name?: string
  age?: number
};

const Demo01: React.FC = () => {
  // 使用 useLocation 來獲取傳遞的 state 參數
  const location = useLocation()
  const state = location.state as LocationState
  // 參數從 state 中獲取，並設置默認值
  const name = state?.name || ''
  const age = state?.age || 0

  return (
    <Card title='接收的參數'>
      <p>姓名: {name}</p>
      <p>年齡: {age}</p>
    </Card>
  )
}

export default Demo01
