import { Menu } from 'antd'
import React from 'react'

const DropdownMenu: React.FC =() => {
  const menuClick = (info: any) => {
    if (info.key === '1') {
      window.open('/container/demo/antdDemo/Demo/Form/ProFormText')
    }
    if (info.key === '2') {
      window.open('/container/demo/antdDemo/Demo/Form/ProFormSelect')
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



