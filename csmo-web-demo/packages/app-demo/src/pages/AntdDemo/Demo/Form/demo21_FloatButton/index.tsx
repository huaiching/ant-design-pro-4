
import React from 'react'
import { observer } from 'mobx-react'
import { VerticalAlignTopOutlined, VerticalAlignBottomOutlined, AppstoreOutlined } from '@ant-design/icons'
import { FloatButton } from 'antd'
import { PageContainer, ProForm } from '@ant-design/pro-components'
const TabContent1: React.FC = () => {

  return (
    <PageContainer
      header={{
        ghost: true
      }}
    >
      <ProForm submitter={false} layout="vertical">
        <FloatButton.Group
          shape='square'
          trigger="click"
          style={{ bottom: 100 }}
          placement='top'
          icon={<AppstoreOutlined />}
        >
          <FloatButton
            icon={<VerticalAlignTopOutlined />}
            // tooltip='回頂部'
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              })
              const target = document.getElementById('tabContent') || window
              target.scrollTo({
                top: 0,
                behavior: 'smooth'
              })
            }}
          />
          <FloatButton
            icon={<VerticalAlignBottomOutlined />}
            // tooltip='到底部'
            onClick={() => {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
              })
              const target = document.getElementById('tabContent') || window
              target.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
              })
            }}
          />
        </FloatButton.Group>
      </ProForm>
    </PageContainer>
  )
}

export default observer(TabContent1)
