import { PageContainer } from '@ant-design/pro-components'
import React from 'react'
import { useIntl } from 'umi'

const Home: React.FC = () => {
  const { formatMessage } = useIntl()
  return (
    <PageContainer title={formatMessage({ id: 'integrationquery.title' })}>
      <h1>理賠資訊-首頁</h1>
    </PageContainer>
  )
}

export default Home