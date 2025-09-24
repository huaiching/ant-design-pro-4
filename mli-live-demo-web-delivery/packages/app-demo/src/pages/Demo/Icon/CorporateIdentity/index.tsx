import { DownloadOutlined, LeftOutlined, RightOutlined, RotateLeftOutlined, RotateRightOutlined, SwapOutlined, UndoOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-components'
import MliFavicon from '@mli-csmo/app-container/public/favicon.ico'
import MliLogoImg from '@mli-csmo/app-container/src/statics/logo.png'
import { Alert, Image, Space } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import './index.less'

type imageMap = {
  name: string,
  url: any,
  intro: string
}

const imageList: imageMap[] = [
  { name: 'MliLogo', url: MliLogoImg, intro: '三商美邦人壽，中英文對照商標' },
  { name: 'MliFavicon', url: MliFavicon, intro: '三商美邦人壽，Favicon' }
]


const CorporateIdentity: React.FC = () => {
  const [current, setCurrent] = React.useState(0)

  const onDownload = () => {
    const url = imageList[current].url

    const suffixMap = {
      'image/x-icon': '.ico',
      'image/png': '.png',
      'image/svg+xml': '.svg'
    } as const

    if (url.startsWith('data:image')) {
      const match = url.match(/^data:(image\/[^;]+);base64,/)
      if (!match) return

      const mime = match[1] as keyof typeof suffixMap
      const suffix = suffixMap[mime] || '.img'
      const filename = imageList[current].name + '_' + dayjs().format('YYYY-MM-DD') + suffix

      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      link.remove()
    } else {
      const suffix = url.slice(url.lastIndexOf('.'))
      const filename = imageList[current].name + '_' + dayjs().format('YYYY-MM-DD') + suffix

      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = blobUrl
          link.download = filename
          document.body.appendChild(link)
          link.click()
          URL.revokeObjectURL(blobUrl)
          link.remove()
        })
    }
  }

  return (
    <PageContainer>
      <Alert
        message="點選圖片後，下方工具列第三個為下載按鈕"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <br />
      <br />

      <Image.PreviewGroup
        preview={{
          toolbarRender: (
            _,
            {
              transform: { scale },
              actions: {
                onActive,
                onFlipY,
                onFlipX,
                onRotateLeft,
                onRotateRight,
                onZoomOut,
                onZoomIn,
                onReset
              }
            }
          ) => (
            <Space size={12} className="toolbar-wrapper">
              <LeftOutlined disabled={current === 0} onClick={() => onActive?.(-1)} />
              <RightOutlined disabled={current === imageList.length - 1} onClick={() => onActive?.(1)} />
              <DownloadOutlined onClick={onDownload} />
              <SwapOutlined rotate={90} onClick={onFlipY} />
              <SwapOutlined onClick={onFlipX} />
              <RotateLeftOutlined onClick={onRotateLeft} />
              <RotateRightOutlined onClick={onRotateRight} />
              <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
              <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
              <UndoOutlined onClick={onReset} />
            </Space>
          ),
          onChange: (index) => {
            setCurrent(index)
          }
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {imageList.map((item, index) => (
            <div
              key={item.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: 32,
                gap: '16px',
                padding: '20px',
                backgroundColor: '#f7f7f7',
                borderRadius: '12px'
              }}
            >
              <div
                style={{
                  marginBottom: 8,
                  fontSize: 16
                }}
              >{item.intro}
              </div>

              < Image
                key={item.name}
                src={item.url}
                style={{ maxHeight: 100, width: 'auto' }}
                onClick={() => setCurrent(index)}
              />
            </div>
          ))}
        </div>
      </Image.PreviewGroup>
    </PageContainer>

  )
}

export default CorporateIdentity