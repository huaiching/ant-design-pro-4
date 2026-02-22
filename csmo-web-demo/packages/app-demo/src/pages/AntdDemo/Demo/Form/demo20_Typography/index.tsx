import { PageContainer } from '@ant-design/pro-components'
import { Space, Typography } from 'antd'
import React from 'react'

const TypographyDemo: React.FC = () => {
  return (
    <PageContainer>
      <Typography.Title level={1}>Title.h1: 會設定為 粗體，會自動換行</Typography.Title>
      <Typography.Title level={2} style={{ fontWeight: 'normal' }}>Title.h2: 非粗體要用CSS設定</Typography.Title>
      <Typography.Title level={3} style={{ color: '#061bffff' }}>Title.h3: css的 color 可以設定顏色</Typography.Title>
      <Typography.Title level={4}>Title.h4</Typography.Title>
      <Typography.Title level={5}>Title.h5</Typography.Title>

      <hr />

      <Space direction="vertical">
        <Typography.Text>Text: 內文，不會自動換行</Typography.Text>
        <Typography.Text style={{ color: '#061bffff' }}>Text: css的 color 可以設定顏色</Typography.Text>
        <Typography.Text type="secondary">Text: type (secondary)</Typography.Text>
        <Typography.Text type="success">Text: type (success)</Typography.Text>
        <Typography.Text type="warning">Text: type (warning)</Typography.Text>
        <Typography.Text type="danger">Text: type (danger)</Typography.Text>
        <Typography.Text mark>Text: mark (Title 也有)</Typography.Text>
        <Typography.Text code>Text: code (Title 也有)</Typography.Text>
        <Typography.Text keyboard>Text: keyboard (Title 也有)</Typography.Text>
        <Typography.Text underline>Text: underline (Title 也有)</Typography.Text>
        <Typography.Text delete>Text: delete (Title 也有)</Typography.Text>
        <Typography.Text strong>Text: 粗體 (strong)</Typography.Text>
        <Typography.Text italic>Text: 斜體 (italic) (Title 也有)</Typography.Text>
        <Typography.Link href="https://ant.design" target="_blank">
          超連結 (Link)
        </Typography.Link>
      </Space>

      <hr />

      <Typography.Paragraph>Paragraph: 段落，會自動換行</Typography.Paragraph>
      <Typography.Paragraph style={{ color: '#061bffff' }}>Paragraph: css的 color 可以設定顏色</Typography.Paragraph>
      <Typography.Paragraph type="secondary">Paragraph: type (secondary)</Typography.Paragraph>
      <Typography.Paragraph type="success">Paragraph: type (success)</Typography.Paragraph>
      <Typography.Paragraph type="warning">Paragraph: type (warning)</Typography.Paragraph>
      <Typography.Paragraph type="danger">Paragraph: type (danger)</Typography.Paragraph>
      <Typography.Paragraph mark>Paragraph: mark (Title 也有)</Typography.Paragraph>
      <Typography.Paragraph code>Paragraph: code (Title 也有)</Typography.Paragraph>
      <Typography.Paragraph keyboard>Paragraph: keyboard (Title 也有)</Typography.Paragraph>
      <Typography.Paragraph underline>Paragraph: underline (Title 也有)</Typography.Paragraph>
      <Typography.Paragraph delete>Paragraph: delete (Title 也有)</Typography.Paragraph>
      <Typography.Paragraph strong>Paragraph: 粗體 (strong)</Typography.Paragraph>
      <Typography.Paragraph italic>Paragraph: 斜體 (italic) (Title 也有)</Typography.Paragraph>
    </PageContainer>
  )
}

export default TypographyDemo