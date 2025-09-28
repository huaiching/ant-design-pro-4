import React from 'react'
import { Button, Flex, Segmented, Switch, Typography } from 'antd'
import type { FlexProps } from 'antd'

// 外層容器樣式
const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 300,
  borderRadius: 6,
  border: '1px solid #40a9ff',
}

// 水平對齊選項
const justifyOptions = [
  'flex-start',    // 靠左
  'center',        // 置中
  'flex-end',      // 靠右
  'space-between', // 兩端對齊，中間平均分配
  'space-around',  // 每個元素周圍間隔相等
  'space-evenly',  // 元素與元素間間隔完全平均
]

// 垂直對齊選項
const alignOptions = [
  'flex-start',  // 靠上
  'center',      // 垂直置中
  'flex-end'     // 靠下
]

// 垂直對齊選項
const gapOptions = [
  'small',  // 小間距
  'middle', // 中間距
  'large'   // 大間距
]

const App: React.FC = () => {
  const [justify, setJustify] = React.useState<FlexProps['justify']>(justifyOptions[0])
  const [alignItems, setAlignItems] = React.useState<FlexProps['align']>(alignOptions[0])
  const [gap, setGap] = React.useState<FlexProps['gap']>(gapOptions[0])
  const [vertical, setVertical] = React.useState<boolean>(false)

  return (
    <Flex gap='middle' vertical>
      <Typography.Paragraph>
        <Typography.Text>垂直布局 (vertical)：</Typography.Text>
        <Switch
          value={vertical}
          onChange={setVertical}
          style={{ width: 60 }}
          checkedChildren='開啟'
          unCheckedChildren='關閉'
        />
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text>水平對齊 (justify)：</Typography.Text>
        <Segmented options={justifyOptions} onChange={setJustify} />
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text>垂直對齊 (align)：</Typography.Text>
        <Segmented options={alignOptions} onChange={setAlignItems} />
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text>間距 (gap)：</Typography.Text>
        <Segmented options={gapOptions} onChange={setGap} />
      </Typography.Paragraph>

      {/* Flex 容器：根據選擇的 justify 與 align 動態調整排列 */}
      <Flex
        style={boxStyle}
        vertical={vertical} // 是否開啟垂直布局 (沒寫是不開啟)
        justify={justify}   // 水平對齊方式
        align={alignItems}  // 垂直對齊方式
        gap={gap}         // 元素間距
      >
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
      </Flex>
    </Flex>
  )
}

export default App
