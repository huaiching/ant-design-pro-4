import { ColorDefinition } from '@/types/color'
import { PageContainer } from '@ant-design/pro-components'
import { message } from 'antd'

const colorBox: ColorDefinition[] = [
  { name: 'Success', hex: '#52c41a' },
  { name: 'Warning', hex: '#faad14' },
  { name: 'Error', hex: '#ff4d4f' }
]

const FunctionColorBox: React.FC<ColorDefinition> = ({ name, hex }) => {
  const textColor = hex === '#FFFFFF' ? '#333' : '#FFF'

  return (
    <div
      style={{
        backgroundColor: hex,
        color: textColor,
        borderRadius: '12px',
        padding: '16px',
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

const FunctionColor: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  return (
    <PageContainer>
      {contextHolder}
      <p>綠色成功，黃色警告，紅色錯誤</p>
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
        {colorBox.map((color) => {

          return (
            <FunctionColorBox key={color.name} {...color} />
          )
        })}
      </div>
      <br />
      <div>
        <p>
          可以點擊下方button，以查看icon各自對應的顏色
        </p>
      </div>
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
        {colorBox.map((color) => {
          return (
            <button
              style={{
                color: color.hex,
                borderRadius: '12px',
                padding: '16px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
              key={color.name}
              type='button'
              onClick={() => {
                messageApi.open({
                  type: color.name.toLowerCase() as 'success' | 'info' | 'warning' | 'error' | 'loading',
                  content: `${color.name} Message`
                }
                )
              }}
            >
              {color.name}
            </button>
          )
        })}
      </div>
    </PageContainer >
  )
}

export default FunctionColor