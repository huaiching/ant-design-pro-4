import { Typography } from 'antd'
import React from 'react'

const Home: React.FC = () => {

  const { Title } = Typography

  return (
    <div style={{ paddingLeft: 30}}>
      <Typography>
        <Title level={3}>
          此專案為 <code>黃懷慶</code> 整理的 前後端 開發範例，提供 <code>前後端簡易教學</code> 及 <code>開發範例</code> 使用。 <br/>
          詳細內容 請參閱 <code>元件範例</code> 子應用。
        </Title>
      </Typography>
    </div>
  )
}

export default Home