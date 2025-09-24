import { PageContainer } from '@ant-design/pro-components'
import { Badge } from 'antd'

type Colors = {
  name: string,
  hex: string
}

const mliBlue: Colors[] = [
  { name: 'MliBlue_1', hex: '#e6f7ff' },
  { name: 'MliBlue_2', hex: '#bae7ff' },
  { name: 'MliBlue_3', hex: '#91d5ff' },
  { name: 'MliBlue_4', hex: '#69c0ff' },
  { name: 'MliBlue_5', hex: '#40a9ff' },
  { name: 'MliBlue_6', hex: '#1890ff' },
  { name: 'MliBlue_7', hex: '#096dd9' },
  { name: 'MliBlue_8', hex: '#0050b3' },
  { name: 'MliBlue_9', hex: '#003a8c' },
  { name: 'MliBlue_0', hex: '#002766' }
]

const defaultBlue: Colors[] = [
  { name: 'DefaultBlue_1', hex: '#e6f4ff' },
  { name: 'DefaultBlue_2', hex: '#bae0ff' },
  { name: 'DefaultBlue_3', hex: '#91caff' },
  { name: 'DefaultBlue_4', hex: '#69b1ff' },
  { name: 'DefaultBlue_5', hex: '#4096ff' },
  { name: 'DefaultBlue_6', hex: '#1677ff' },
  { name: 'DefaultBlue_7', hex: '#0958d9' },
  { name: 'DefaultBlue_8', hex: '#003eb3' },
  { name: 'DefaultBlue_9', hex: '#002c8c' },
  { name: 'DefaultBlue_0', hex: '#001d66' }
]

const ColorBox: React.FC<Colors> = ({ name, hex }) => {
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

const Color: React.FC = () => {

  return (
    <PageContainer>
      <Badge.Ribbon text="Mli">
        <h2>Mli Blue</h2>
        <p>此為公司客製化藍色，使用#096dd9作為主題色，使用#1890ff作為loading圖的顏色</p>
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
        {mliBlue.map((color) => (
          <ColorBox key={color.hex} {...color} />
        ))}
      </div>

      <Badge.Ribbon text="預設" color='volcano' style={{borderStyle: 'dash'}}>
        <h2>Default Blue</h2>
        <p>此為預設藍色，使用#1677ff作為其他功能的藍色，例如按鈕的顏色</p>
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
        {defaultBlue.map((color) => (
          <ColorBox key={color.hex} {...color} />
        ))}
      </div>
    </PageContainer>
  )
}

export default Color