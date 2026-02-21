import React from 'react'
import { Button, Flex, Segmented, Space, Switch, Typography } from 'antd'
import type { FlexProps, SpaceProps } from 'antd'
import { PageContainer, ProForm } from '@ant-design/pro-components'

// 外層容器樣式
const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 300,
  borderRadius: 6,
  border: '1px solid #40a9ff',
}

const sizeOptions = [
  'small', 'middle', 'large'
]

// 垂直對齊選項
const alignOptions = [
  'center', 'start', 'end', 'baseline'
]

// 垂直對齊選項
const gapOptions = [
  'small',  // 小間距
  'middle', // 中間距
  'large'   // 大間距
]

const App: React.FC = () => {
  const [size, setSize] = React.useState<any>(sizeOptions[0])
  const [alignItems, setAlignItems] = React.useState<any>(alignOptions[0])
  const [gap, setGap] = React.useState<any>(gapOptions[0])
  const [vertical, setVertical] = React.useState<boolean>(false)

  return (
    <PageContainer
      header={{
        ghost: true
      }}
    >
      <ProForm submitter={false} layout="vertical">
        <Flex gap='middle' vertical>
          <Typography.Paragraph>
            <Typography.Text>間距 (size)：</Typography.Text>
            <Segmented options={sizeOptions} onChange={setSize} />
          </Typography.Paragraph>
          <Typography.Paragraph>
            <Typography.Text>垂直對齊 (align)：</Typography.Text>
            <Segmented options={alignOptions} onChange={setAlignItems} />
          </Typography.Paragraph>

          {/* Flex 容器：根據選擇的 justify 與 align 動態調整排列 */}
          <Space
            style={boxStyle}
            align={alignItems} // 垂直對齊
            size={size} // 間距
            wrap // 自行換行
          >
            <Button type="primary">Primary</Button>
            <Button type="primary">Primary</Button>
            <Button type="primary">Primary</Button>
            <Button type="primary">Primary</Button>
          </Space>
        </Flex>
      </ProForm>
    </PageContainer >
  )
}

export default App
