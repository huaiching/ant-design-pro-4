import React from 'react'
import { Button, Space } from 'antd'
import { useNavigate } from '@umijs/max'

const Navigate: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Space direction='vertical'>
        {/* 1. 回上一頁 */}
        <Button
          type='primary'
          onClick={() => navigate(-1)}
        >
          回上一頁
        </Button>

        {/* 2. 原頁面跳轉 */}
        <Button
          type='primary'
          onClick={() => navigate('/reactDemo/demo01')}
        >
          原頁面跳轉
        </Button>

        {/* 3. 新開分頁 */}
        <Button
          type='primary'
          onClick={() => window.open('/container/demo/reactDemo/demo01', '_blank')}
        >
          新開分頁
        </Button>

        {/* 4. 原頁面跳轉 + 傳送參數 */}
        <Button
          type='primary'
          onClick={() =>
            navigate('/antdDemo/navigate', {
              state: { name: 'Tom', age: 20 },
            })
          }
        >
          原頁面跳轉 + 傳送參數: name=Tom, age=20
        </Button>

        {/* 5. 新開分頁 + 傳送參數*/}
        <Button
          type='primary'
          onClick={() => {
            const data = { name: 'Tom', age: 20 }
            sessionStorage.setItem('params', JSON.stringify(data))
            window.open('/container/demo/antdDemo/sessionStorage', '_blank')
            sessionStorage.removeItem('params');
          }}
        >
          新開分頁 + 傳送參數: name=Tom, age=20
        </Button>

        <Button
          type='primary'
          onClick={() => {
            const data = { name: '測試用戶', age: 25 }
            sessionStorage.setItem('params', JSON.stringify(data))
            window.open('/container/demo/antdDemo/sessionStorage', '_blank')
            sessionStorage.removeItem('params');
          }}
        >
          新開分頁 + 傳送參數: name=測試用戶, age=25
        </Button>
      </Space>
    </div>
  )
}

export default Navigate
