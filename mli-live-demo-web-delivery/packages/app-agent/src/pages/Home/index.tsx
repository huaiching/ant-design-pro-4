import { PageContainer } from '@ant-design/pro-components'
import React from 'react'
import { useIntl } from 'umi'

const Home: React.FC = () => {
  const { formatMessage } = useIntl()
  return (
    <PageContainer title={formatMessage({ id: 'agent.title' })}>
      <h1>業務員資訊-首頁</h1>
    </PageContainer>
  )
}

export default Home