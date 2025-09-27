import React from 'react'
import { Button, Image, Popover, Space } from 'antd'
import TestImage from './Store/TestImage.png'

const PopoverDemo: React.FC = () => {
  return (
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
  )
}

export default PopoverDemo