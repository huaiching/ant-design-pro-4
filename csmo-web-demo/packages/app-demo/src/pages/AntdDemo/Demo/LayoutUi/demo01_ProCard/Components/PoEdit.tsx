import { MliFormRow } from '@mli-csmo/base'
import { ProFormText } from '@ant-design/pro-components'
import { ConfigProvider } from 'antd'
import React from 'react'

interface Props {
  poEdit: string
}

const PoEdit: React.FC<Props> = ({
  poEdit
}) => {
  return (
    <ConfigProvider componentDisabled={poEdit !== 'edit'}>
      <MliFormRow>
        <ProFormText
          name={['poChange', 'poData', 'policyNo']}
          label='保單號碼'
          placeholder=''
        />
        <ProFormText
          name={['poChange', 'poData', 'poStsCode']}
          label='保單狀態'
          placeholder=''
        />
      </MliFormRow>
    </ConfigProvider>
  )
}

export default PoEdit
