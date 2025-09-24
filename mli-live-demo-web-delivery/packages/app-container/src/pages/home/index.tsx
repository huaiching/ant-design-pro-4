import {PageHeader} from '@ant-design/pro-layout'
import {getUser} from '@mli-csmo/app-common'
import React from 'react'

const Home: React.FC = () => {

  return (
    <div>
      <PageHeader title={`您好！ ${getUser()?.username || ''}`} />
    </div>
  )
}

export default Home
