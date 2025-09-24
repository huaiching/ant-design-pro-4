import * as ClaimHospital from '@mli-csmo/app-model/src/services/claim/ClaimHosipitalController'
import { claim } from '@mli-csmo/app-model/src/services/claim/typings'
import { MliTable } from '@mli-csmo/base'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'


const HospitalDetail: React.FC<{ hospitalRow: any; selectedRow: any }> = ({ hospitalRow, selectedRow }) => {
  const claim = 'integrationquery.claim'

  const [claimHospitalDetail, setClaimHospitalDetail] = useState<any[]>([])

  useEffect(() => {
    setClaimHospitalDetail([])
  }, [selectedRow])

  useEffect(() => {
    if (!hospitalRow) return
    if (hospitalRow.length === 0) return

    const body: claim.QueryClaimHospitalDetailDTO = {
      policyNo: selectedRow.policyNo ?? '',
      claimSeq: selectedRow.claimSeq ?? '',
      claimYear: selectedRow.claimYear ?? '',
      clhnSeq: hospitalRow.clhnSeq ?? ''
    }

    const getClaimHospitalDetail = async () => {

      try {
        const response = await ClaimHospital.queryClaimHospitalDetail(body)

        setClaimHospitalDetail(response)
      } catch (err) {
        // console.error('取得就診明細失敗 : ', err)
      }
    }

    getClaimHospitalDetail()
  }, [hospitalRow])

  const columns: any[] = [
    {
      dataIndex: 'desc',
      moduleName: claim,
      columnName: 'desc',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'begDate',
      moduleName: claim,
      columnName: 'begDate',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'begTime',
      moduleName: claim,
      columnName: 'begTime',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'endDate',
      moduleName: claim,
      columnName: 'endDate',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'endTime',
      moduleName: claim,
      columnName: 'endTime',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'clhdDay',
      moduleName: claim,
      columnName: 'clhdDay',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'clhdHour',
      moduleName: claim,
      columnName: 'clhdHour',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'times',
      moduleName: claim,
      columnName: 'times',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    }
  ]

  return (
    <>
      <h4>
        <FormattedMessage id="content.detailedconsultation"/>
      </h4>
      <MliTable
        moduleName={claim}
        columns={columns}
        // rowKey="desc"
        toolBarRender={false}
        search={false}
        dataSource={claimHospitalDetail}
      />
    </>
  )
}

export default HospitalDetail