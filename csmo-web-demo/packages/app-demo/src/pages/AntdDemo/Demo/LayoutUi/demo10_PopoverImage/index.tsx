import React from 'react'
import { Button, Image, Popover, Space } from 'antd'
import TestImage from './Image/TestImage.png'
import { PageContainer, ProForm } from '@ant-design/pro-components'

const PopoverDemo: React.FC = () => {
  return (
    <PageContainer
      header={{
        ghost: true
      }}
    >
      <ProForm submitter={false} layout="vertical">
        <Popover
          content={
            <Space direction="vertical">
              <Image
                width={200}
                src={TestImage}
              />
              <Button type="link">更多操作</Button>
            </Space>
          }
          trigger="click"
          placement="bottom"
        >
          <Button type="primary">點我展開</Button>
        </Popover>
      </ProForm>
    </PageContainer >
  )
}

export default PopoverDemo