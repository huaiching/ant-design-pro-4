import { PageContainer } from '@ant-design/pro-components'
import * as AgentApi from '@mli-csmo/app-model/src/services/agent/CustomAPI'
import { agent } from '@mli-csmo/app-model/src/services/agent/typings'
import { MliTable } from '@mli-csmo/base'
import { useIntl } from '@umijs/max'
import React from 'react'

const AgentInfo: React.FC = () => {
  const agentInfo = 'agent.agentInfo'

  const { formatMessage } = useIntl()

  const columns: any[] = [
    {
      moduleName: agentInfo,
      columnName: 'agentCode',
      fieldProps: {
        maxLength: 20
      }
    },
    {
      moduleName: agentInfo,
      columnName: 'names',
      hideInSearch: true
    },
    {
      moduleName: agentInfo,
      columnName: 'sex',
      hideInSearch: true,
      render: (text: any) => {
        if (text?.props?.children === '0') {
          return '公司行號'
        }

        if (text?.props?.children === '1') {
          return '男性'
        }

        if (text?.props?.children === '2') {
          return '女性'
        }

        return text?.props?.children
      }
    },
    {
      moduleName: agentInfo,
      columnName: 'birthDate',
      hideInSearch: true
    },
    {
      moduleName: agentInfo,
      columnName: 'level',
      hideInSearch: true
    },
    {
      moduleName: agentInfo,
      columnName: 'deptCode',
      hideInSearch: true
    },
    {
      moduleName: agentInfo,
      columnName: 'deptName',
      hideInSearch: true
    },
    {
      moduleName: agentInfo,
      columnName: 'deptHead',
      hideInSearch: true
    }
  ]

  return (
    <PageContainer
      header={{
        title: formatMessage({ id: 'agentInfo.title' }),
        ghost: true
      }}
    >
      <MliTable
        moduleName={agentInfo}
        columns={columns}
        scroll={{ x: 'max-content' }}
        cardBordered
        rowKey='agentCode'
        request={async (params) => {
          const body: agent.Criterion = {
            field: 'agentCode',
            queryOperator: 'EQUAL',
            value: params?.agentCode
          }

          try {
            const response = await AgentApi.getAgentDetail(body)

            const refined = (Array.isArray(response) ? response : [response])

            return {
              data: refined,
              success: true
            }
          } catch (error) {
            return {
              data: [],
              success: true
            }
          }
        }}
      />

    </PageContainer>
  )
}

export default AgentInfo