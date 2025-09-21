
import React from 'react'
import { observer } from 'mobx-react'
import { VerticalAlignTopOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons'
import { FloatButton } from 'antd'
const TabContent1: React.FC = () => {

  return (
    <>
      <div style={{ height: '5000px' }}>長內容區域...</div>

      <FloatButton.Group shape="circle" style={{ bottom: 100 }}>
        <FloatButton
          icon={<VerticalAlignTopOutlined />}
          tooltip='回頂部'
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })
          }}
        />
        <FloatButton
          icon={<VerticalAlignBottomOutlined />}
          tooltip='到底部'
          onClick={() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }}
        />
      </FloatButton.Group>
    </>
  )
}

export default observer(TabContent1)
