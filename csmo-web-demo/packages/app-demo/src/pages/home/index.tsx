import { PageContainer } from '@ant-design/pro-components'
import React from 'react'
import { useIntl } from 'umi'
const Home: React.FC = () => {
  const { formatMessage } = useIntl()
  return (
    <PageContainer title={formatMessage({ id: 'home.title' })}>
      <h1>Home</h1>
    </PageContainer>
  )
}

export default Home
