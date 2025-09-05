import { Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const DropdownMenu: React.FC =() => {
  const navigate = useNavigate()

  const menuClick = (info: any) => {
    if (info.key === '1') {
      navigate('?activeKey=ProFormText')         // 修改網址
      window.open(window.location.href, '_blank') // 頁面跳轉 (開新視窗)
    }
    if (info.key === '2') {
      navigate('?activeKey=ProFormSelect')
      window.open(window.location.href, '_blank')
    }
  }

  return (
    <Menu onClick={menuClick}>
      <Menu.Item key='1'> 單行文本輸入 </Menu.Item>
      <Menu.Item key='2'> 下拉選擇框 </Menu.Item>
    </Menu>

  )
}

export default DropdownMenu



