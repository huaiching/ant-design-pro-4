// src/pages/user/index.tsx
import React from 'react'
import { PageContainer } from '@ant-design/pro-components'
import Create from './Components/Create'
import Display from './Components/Display'
import { observer } from 'mobx-react'

const UserPage: React.FC = () => {
  return (
    <PageContainer>
      <Create />
      <Display />
    </PageContainer>
  )
}

export default observer(UserPage)
