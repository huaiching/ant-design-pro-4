import { PageContainer } from '@ant-design/pro-components'
import { decrypted, encrypted } from '@mli-csmo/app-common/src/util/crypto/CryptoUtils'
import * as ClaimInfoApi from '@mli-csmo/app-model/src/services/claim/ClaimInfoController'
import { claim } from '@mli-csmo/app-model/src/services/claim/typings'
import { MliTable } from '@mli-csmo/base'
import { useIntl } from '@umijs/max'
import { message } from 'antd'
import { useState } from 'react'
import ClaimTab from './ClaimTab'

const ClaimRecord: React.FC = () => {
  const claim = 'integrationquery.claim'

  const { formatMessage } = useIntl()
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [basicInfo, setBasicInfo] = useState<any>(null)
  const [messageApi, contextHolder] = message.useMessage()

  const handleRowClick = async (record: any) => {
    setSelectedRow(record)

    const body: claim.QueryClaimBasicInfoDTO = {
      policyNo: record.policyNo ?? '',
      claimSeq: record.claimSeq ?? '',
      claimYear: record.claimYear ?? ''
    }

    try {
      const response = await ClaimInfoApi.queryClaimBasicInfo(body)

      messageApi.open({
        type: 'success',
        content: '更新資訊'
      })

      setBasicInfo(response)
    } catch (e) {
      message.error('查詢理賠基本資料失敗')

      setBasicInfo('')
    }
  }

  const columns: any[] = [
    {
      dataIndex: 'policyNo',
      moduleName: claim,
      columnName: 'policyNo',
      fieldProps: {
        maxLength: 12
      },
      formItemProps: (form: any) => ({
        rules: [
          {
            validator: (_: any, value: any) => {
              const field2 = form.getFieldValue('insuredId')
              if (!value && !field2) {
                return Promise.reject(new Error('保單號碼與被保險人ID不能同時為空'))
              }
              return Promise.resolve()
            }
          }
        ]
      }),
      render: (text: any) => {
        return decrypted(text?.props?.children)
      }
    }, {
      title: '被保險人ID',
      dataIndex: 'insuredId',
      moduleName: claim,
      columnName: 'insuredId',
      hideInTable: true,
      fieldProps: {
        maxLength: 20
      },
      formItemProps: (form: any) => ({
        rules: [
          {
            validator: (_: any, value: any) => {
              const field1 = form.getFieldValue('policyNo')
              if (!value && !field1) {
                return Promise.reject(new Error('保單號碼與被保險人ID不能同時為空'))
              }
              return Promise.resolve()
            }
          }
        ]
      }),
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'claimYear',
      moduleName: claim,
      columnName: 'claimYear',
      fieldProps: {
        maxLength: 3
      },
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'claimSeq',
      moduleName: claim,
      columnName: 'claimSeq',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'clcmInd',
      moduleName: claim,
      columnName: 'clcmInd',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'eventDate',
      moduleName: claim,
      columnName: 'eventDate',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'eventName',
      moduleName: claim,
      columnName: 'eventName',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'clStsDesc',
      moduleName: claim,
      columnName: 'clStsDesc',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'claimDesc',
      moduleName: claim,
      columnName: 'claimDesc',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'clExamineDesc',
      moduleName: claim,
      columnName: 'clExamineDesc',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'examineName',
      moduleName: claim,
      columnName: 'examineName',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'approveDate',
      moduleName: claim,
      columnName: 'approveDate',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'claimCurrency',
      moduleName: claim,
      columnName: 'claimCurrency',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'claimAmt',
      moduleName: claim,
      columnName: 'claimAmt',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'clEventDesc',
      moduleName: claim,
      columnName: 'clEventDesc',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    }
  ]

  return (
    <PageContainer
      header={{
        title: formatMessage({ id: 'claimrecord.title' }),
        ghost: true
      }}
    >
      {contextHolder}

      <MliTable
        moduleName={claim}
        columns={columns}
        scroll={{ x: 'max-content' }}
        cardBordered
        rowKey='claimSeq'
        onRow={(record) => ({
          onClick: () => handleRowClick(record)
        })}
        request={async (params) => {
          const body: claim.QueryClaimHistoryDTO = {
            policyNo: params.policyNo ?? '',
            insuredId: params.insuredId ?? '',
            claimYear: params.claimYear ?? ''
          }

          body.policyNo = encrypted(body.policyNo)

          try {
            const response = await ClaimInfoApi.queryClaimHistory(body)
            setBasicInfo('')

            return {
              data: response,
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

      {selectedRow && (
        <ClaimTab basicInfo={basicInfo} selectedRow={selectedRow} />
      )}
    </PageContainer>
  )
}

export default ClaimRecord