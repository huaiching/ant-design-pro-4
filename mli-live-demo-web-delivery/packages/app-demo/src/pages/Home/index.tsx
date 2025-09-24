import { PageContainer } from '@ant-design/pro-components'
import React from 'react'
import { useIntl } from 'umi'

const Home: React.FC = () => {
  const { formatMessage } = useIntl()
  
  return (
    <PageContainer title={formatMessage({ id: 'demo.title' })}>
      <h1>我在Home Page</h1>
    </PageContainer>
  )
}

export default Home
