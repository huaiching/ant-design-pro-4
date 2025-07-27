import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form'
import { PageContainer } from '@ant-design/pro-layout'
import { Button } from 'antd'
import React, { useRef } from 'react'
import { callDownloadApi } from '../store/apiCaller'

const MyForm: React.FC = () => {
    const formRef = useRef<ProFormInstance>()

    const downloadReport = () => {
      callDownloadApi('POST', 'http://localhost:8080/export/exportDemo01', 'docx', {
        clientId: formRef.current?.getFieldValue("clientId"),
      })
    }

    return (
      <PageContainer>
          <ProForm
              grid
              layout="vertical"
              formRef={formRef}
              submitter={false}
          >
              <ProFormText
                  name="clientId"
                  label="客戶證號"
                  placeholder="請輸入客戶證號"
              />
              <Button type='primary' onClick={async () => {downloadReport()}}>下載報表</Button>
          </ProForm>
      </PageContainer>
    )
}

export default MyForm
