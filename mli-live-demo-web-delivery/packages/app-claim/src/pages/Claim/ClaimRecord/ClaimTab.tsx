import { ProCard, ProDescriptions } from '@ant-design/pro-components'
import * as ClaimHospital from '@mli-csmo/app-model/src/services/claim/ClaimHosipitalController'
import { claim } from '@mli-csmo/app-model/src/services/claim/typings'
import { MliTable } from '@mli-csmo/base'
import { message, Spin, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useIntl } from 'umi'
import HospitalDetail from './HospitalDetail'

const { TabPane } = Tabs
const integrationqueryClaim = 'integrationquery.claim'

const ClaimTab: React.FC<{ basicInfo: any; selectedRow: any }> = ({ basicInfo, selectedRow }) => {
  const { formatMessage } = useIntl()
  const [activeKey, setActiveKey] = useState('card')
  const [claimHospital, setClaimHospital] = useState<any[]>([])
  const [hospitalRow, setHospitalRow] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const claim = 'integrationquery.claim'

  useEffect(() => {
    if (basicInfo.length === 0) {
      setClaimHospital([])
    }
  }, [basicInfo])

  useEffect(() => {
    if (!selectedRow) return

    const body: claim.QueryClaimHospitalDetailDTO = {
      policyNo: selectedRow.policyNo ?? '',
      claimSeq: selectedRow.claimSeq ?? '',
      claimYear: selectedRow.claimYear ?? ''
    }

    const getHospitalTable = async () => {

      try {
        const response = await ClaimHospital.queryClaimHospital(body)

        setClaimHospital(response)
      } catch (err) {
        // console.error('取得就診醫院失敗 : ', err)
      }
    }

    getHospitalTable()
  }, [selectedRow])

  const handleHospitalRowClick = async (record: any) => {
    setHospitalRow(record)

    messageApi.open({
      type: 'success',
      content: '更新就診明細'
    })
  }

  const columns: any[] = [
    {
      dataIndex: 'hiHospitalId',
      moduleName: claim,
      columnName: 'hiHospitalId',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'hiHospitalName',
      moduleName: claim,
      columnName: 'hiHospitalName',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'clmdDesc',
      moduleName: claim,
      columnName: 'clmdDesc',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'doctorName',
      moduleName: claim,
      columnName: 'doctorName',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      dataIndex: 'doctorId',
      moduleName: claim,
      columnName: 'doctorId',
      hideInSearch: true,
      render: (text: any) => {
        return text?.props?.children
      }
    }
  ]

  return (
    <>
      {contextHolder}
      <Tabs
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        style={{ marginTop: 24 }}
      >

        <TabPane tab={formatMessage({ id: 'content.basicclaiminfo' })} key="card">
          <ProCard
            title={formatMessage({ id: 'content.basicclaiminfo' })}
            bordered
            style={{ marginTop: 24 }}>
            {basicInfo ? (
              <ProDescriptions
                column={4}
                bordered
                styles={{
                  content: { color: 'blue', marginTop: 16 },
                  label: { fontWeight: 'bold' }
                }}
              >
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.poIssueDate' })}>
                  {basicInfo.poIssueDate}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.receiveDate' })}>
                  {basicInfo.receiveDate}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.eventDate' })}>
                  {basicInfo.eventDate}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.paperOkDate' })}>
                  {basicInfo.paperOkDate}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.approveDate' })}>
                  {basicInfo.approveDate}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.eventId' })}>
                  {basicInfo.eventId}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.eventName' })}>
                  {basicInfo.eventName}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.claimDesc' })}>
                  {basicInfo.claimDesc}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.clEventType' })}>
                  {basicInfo.clEventType}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.clEventDesc' })}>
                  {basicInfo.clEventDesc}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.examineId' })}>
                  {basicInfo.examineId}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.examineName' })}>
                  {basicInfo.examineName}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.recDeptCode' })}>
                  {basicInfo.recDeptCode}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.recDeptName' })}>
                  {basicInfo.recDeptName}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.claimAmt' })}>
                  {basicInfo.claimAmt}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.dividend' })}>
                  {basicInfo.dividend}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.approveId' })}>
                  {basicInfo.approveId}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.approveName' })}>
                  {basicInfo.approveName}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.approveDeptCode' })}>
                  {basicInfo.approveDeptCode}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.approveDeptName' })}>
                  {basicInfo.approveDeptName}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.premSusp' })}>
                  {basicInfo.premSusp}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.miscSusp' })}>
                  {basicInfo.miscSusp}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.unearnedPrem' })}>
                  {basicInfo.unearnedPrem}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.loans' })}>
                  {basicInfo.loans}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.apls' })}>
                  {basicInfo.apls}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.modePrem' })}>
                  {basicInfo.modePrem}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.suspense' })}>
                  {basicInfo.suspense}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.subAmt' })}>
                  {basicInfo.subAmt}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.deferBegDate' })}>
                  {basicInfo.deferBegDate}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.deferEndDate' })}>
                  {basicInfo.deferEndDate}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.deferInt' })}>
                  {basicInfo.deferInt}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.clExamineCode' })}>
                  {basicInfo.clExamineCode}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.clExamineDesc' })}>
                  {basicInfo.clExamineDesc}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.clofApproveInd' })}>
                  {basicInfo.clofApproveInd}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.taxWithheld' })}>
                  {basicInfo.taxWithheld}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.clApproveCode' })}>
                  {basicInfo.clApproveCode}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.clApproveDesc' })}>
                  {basicInfo.clApproveDesc}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.disbAmt' })}>
                  {basicInfo.disbAmt}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.benfName' })}>
                  {basicInfo.benfName}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.remitAccount' })}>
                  {basicInfo.remitAccount}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.clientIdent' })}>
                  {basicInfo.clientIdent}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.type' })}>
                  {basicInfo.type}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.clStsDesc' })}>
                  {basicInfo.clStsDesc}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.agentName' })}>
                  {basicInfo.agentName}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.agentDeptCode' })}>
                  {basicInfo.agentDeptCode}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.receiveNo' })}>
                  {basicInfo.receiveNo}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.clcpInd' })}>
                  {basicInfo.clcpInd}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.currency' })}>
                  {basicInfo.currency}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.eventArea' })}>
                  {basicInfo.eventArea}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.loansApls' })}>
                  {basicInfo.loansApls}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.minusPremSusp' })}>
                  {basicInfo.minusPremSusp}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.clusInd' })}>
                  {basicInfo.clusInd}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.clTypeOther' })}>
                  {basicInfo.clTypeOther}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.studentNo' })}>
                  {basicInfo.studentNo}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.clEventCode1' })}>
                  {basicInfo.clEventCode1}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.clEventCode2' })}>
                  {basicInfo.clEventCode2}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.clEventCode3' })}>
                  {basicInfo.clEventCode3}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.clEventCode4' })}>
                  {basicInfo.clEventCode4}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.cvAmtOut' })}>
                  {basicInfo.cvAmtOut}
                </ProDescriptions.Item>
                <ProDescriptions.Item label={formatMessage({ id: 'basicInfo.additionPremium' })}>
                  {basicInfo.additionPremium}
                </ProDescriptions.Item>
              </ProDescriptions>
            ) : (
              <p>請點選上方資料列以顯示理賠基本資料</p>
            )}
          </ProCard>
        </TabPane>

        <TabPane tab={formatMessage({ id: 'content.hospital' })} key="hospital">
          <Spin spinning={loading}>
            <h4>
              <FormattedMessage id="content.hospital" />
            </h4>
            <MliTable
              moduleName={integrationqueryClaim}
              columns={columns}
              rowKey="hiHospitalId"
              search={false}
              dataSource={claimHospital}
              toolBarRender={false}
              onRow={(record) => ({
                onClick: () => handleHospitalRowClick(record)
              })}
            />
          </Spin>

          {selectedRow && (
            <HospitalDetail hospitalRow={hospitalRow} selectedRow={selectedRow} />
          )}
        </TabPane>
      </Tabs>
    </>
  )
}

export default ClaimTab
