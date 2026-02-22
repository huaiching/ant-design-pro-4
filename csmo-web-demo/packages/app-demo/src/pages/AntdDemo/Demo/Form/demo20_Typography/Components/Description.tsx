import CodeTsx from '@/utils/CodePre/CodeTsx'
import { PageContainer } from '@ant-design/pro-components'
import { Typography } from 'antd'
import React from 'react'

const { Title, Paragraph } = Typography

const SampleMain: React.FC = () => {
  return (
    <PageContainer>
      <Typography>
        <Paragraph>
          <code>Typography</code> 是 Ant Design 提供的文字排版元件，包含以下三個常用子元件：
          <br />
          <code>Title</code>：標題元件，對應 HTML 的 h1–h5，預設為<strong>粗體</strong>，文字超出時會自動換行。
          <br />
          <code>Text</code>：行內文字元件，適合用於短文字或標註樣式，預設<strong>不會自動換行</strong>。
          <br />
          <code>Paragraph</code>：段落文字元件，適合用於較長的內文描述，預設會<strong>自動換行</strong>。
        </Paragraph>

        <CodeTsx code={`import { PageContainer } from '@ant-design/pro-components'
import { Divider, Space, Typography } from 'antd'
import React from 'react'

const TypographyDemo: React.FC = () => {
  return (
    <PageContainer>

      {/* ========== Title：標題，對應 h1–h5 ========== */}
      <Typography.Title level={1}>Title h1：預設粗體，文字超出時自動換行</Typography.Title>
      <Typography.Title level={2} style={{ fontWeight: 'normal' }}>Title h2：取消粗體需透過 CSS fontWeight 設定</Typography.Title>
      <Typography.Title level={3} style={{ color: '#061bff' }}>Title h3：可透過 CSS color 自訂顏色</Typography.Title>
      <Typography.Title level={4}>Title h4</Typography.Title>
      <Typography.Title level={5}>Title h5</Typography.Title>

      <Divider />

      {/* ========== Text：行內文字，不會自動換行 ========== */}
      <Typography.Title level={4} style={{ fontWeight: 'normal' }}>
        Text — 行內元件，適合短文字或標註樣式，預設不會自動換行
      </Typography.Title>
      <Space direction="vertical">
        <Typography.Text>Text 預設樣式</Typography.Text>
        <Typography.Text style={{ color: '#061bff' }}>CSS color：自訂顏色</Typography.Text>
        <Typography.Text type="secondary">type="secondary"：次要文字，降低視覺權重</Typography.Text>
        <Typography.Text type="success">type="success"：成功狀態（綠色）</Typography.Text>
        <Typography.Text type="warning">type="warning"：警告狀態（黃色）</Typography.Text>
        <Typography.Text type="danger">type="danger"：危險／錯誤狀態（紅色）</Typography.Text>
        <Typography.Text mark>mark：螢光標記背景</Typography.Text>
        <Typography.Text code>code：程式碼樣式（等寬字體 + 底色）</Typography.Text>
        <Typography.Text keyboard>keyboard：鍵盤按鍵樣式</Typography.Text>
        <Typography.Text underline>underline：底線</Typography.Text>
        <Typography.Text delete>delete：刪除線</Typography.Text>
        <Typography.Text strong>strong：粗體</Typography.Text>
        <Typography.Text italic>italic：斜體</Typography.Text>
        <Typography.Link href="https://ant.design" target="_blank">
          Link：超連結樣式，帶 href 屬性
        </Typography.Link>
      </Space>

      <Divider />

      {/* ========== Paragraph：段落文字，會自動換行 ========== */}
      <Typography.Title level={4} style={{ fontWeight: 'normal' }}>
        Paragraph — 區塊元件，適合較長的內文描述，預設會自動換行
      </Typography.Title>
      <Typography.Paragraph>Paragraph 預設樣式</Typography.Paragraph>
      <Typography.Paragraph style={{ color: '#061bff' }}>CSS color：自訂顏色</Typography.Paragraph>
      <Typography.Paragraph type="secondary">type="secondary"：次要文字</Typography.Paragraph>
      <Typography.Paragraph type="success">type="success"：成功狀態（綠色）</Typography.Paragraph>
      <Typography.Paragraph type="warning">type="warning"：警告狀態（黃色）</Typography.Paragraph>
      <Typography.Paragraph type="danger">type="danger"：危險／錯誤狀態（紅色）</Typography.Paragraph>
      <Typography.Paragraph mark>mark：螢光標記背景</Typography.Paragraph>
      <Typography.Paragraph code>code：程式碼樣式</Typography.Paragraph>
      <Typography.Paragraph keyboard>keyboard：鍵盤按鍵樣式</Typography.Paragraph>
      <Typography.Paragraph underline>underline：底線</Typography.Paragraph>
      <Typography.Paragraph delete>delete：刪除線</Typography.Paragraph>
      <Typography.Paragraph strong>strong：粗體</Typography.Paragraph>
      <Typography.Paragraph italic>italic：斜體</Typography.Paragraph>

    </PageContainer>
  )
}

export default TypographyDemo`}
        />
      </Typography>
    </PageContainer>
  )
}

export default SampleMain
