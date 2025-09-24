import { ColorDefinition } from '@/types/color'
import { PageContainer } from '@ant-design/pro-components'
import { Badge } from 'antd'
import React from 'react'

const mliNature: ColorDefinition[] = [
  { name: '標題顏色', hex: '#262626' },
  { name: '次標題顏色', hex: '#595959' },
  { name: '次要文字顏色', hex: '#8C8C8C' }
]

const defaultNature: ColorDefinition[] = [
  { name: '標題顏色', hex: '#000000E0' },
  { name: '一級文本', hex: '#000000E0' },
  { name: '二級文字', hex: '#000000A6' }
]

const NaturalColorBox: React.FC<ColorDefinition> = ({ name, hex }) => {
  const textColor = hex === '#FFFFFF' ? '#333' : '#FFF'

  return (
    <div
      style={{
        backgroundColor: hex,
        color: textColor,
        borderRadius: '12px',
        padding: '16px',
        textAlign: 'center',
        fontWeight: 'bold',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
    >
      {name}
      <br />
      {hex}
    </div>
  )
}

const NaturalColor: React.FC = () => {

  return (
    <PageContainer>
      <p>
        廣義而言，中性色就是文字、邊框的顏色
      </p>
      <br/>
      <Badge.Ribbon text="Mli">
        <p>此為公司客製化中性色</p>
      </Badge.Ribbon>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '16px',
          padding: '20px',
          backgroundColor: '#f7f7f7',
          borderRadius: '12px'
        }}
      >
        {mliNature.map((color) => {

          return (
            <NaturalColorBox key={color.name} {...color} />
          )
        })}
      </div>

      <Badge.Ribbon text="預設" color='volcano'>
        <p>此為預設中性色</p>
      </Badge.Ribbon>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '16px',
          padding: '20px',
          backgroundColor: '#f7f7f7',
          borderRadius: '12px'
        }}
      >
        {defaultNature.map((color) => {

          return (
            <NaturalColorBox key={color.name} {...color} />
          )
        })}
      </div>
    </PageContainer>
  )
}

export default NaturalColor

