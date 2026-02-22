import ProForm, { ProFormInstance, ProFormUploadButton } from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { Button } from 'antd'
import { useRef, useState } from 'react'
import { downloadXlsx } from './store/downloadXlsx'
import { uploadXlsx } from './store/uploadXlsx'
import { MliFormRow } from '@mli-csmo/base'

const Xlsx: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const [uploadData, setUploadData] = useState<any[] | null>(null)

  // 控制送出後之動作
  const submitterRender = () => {
    return {
      render: () => (
        <FooterToolbar>
          <Button
            type='primary'
            onClick={() => {
              formRef.current?.validateFields().then(async () => {
                const file = formRef.current?.getFieldsValue().file[0]
                const data = await uploadXlsx(file.originFileObj)
                setUploadData(data)
              })
            }}
            key='chk'
          >
            解析 (匯入+解析)
          </Button>
        </FooterToolbar>
      )
    }
  }

  return (
    <PageContainer
      header={{
        ghost: true
      }}
    >
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
      >
        <MliFormRow>
          <ProFormUploadButton
            name='file'
            label='上傳文件'
            title='上傳'
            fieldProps={{
              maxCount: 1,
              listType: 'picture-card'
            }}
            rules={[{ required: true, message: '請上傳文件' }]} // 校驗規則，要求文件必須上傳
          />
        </MliFormRow>
        <MliFormRow>
          <Button
            type='default'
            onClick={downloadXlsx}
          >
            下載空白範例 (匯出)
          </Button>
        </MliFormRow>
        <MliFormRow>
          {uploadData && (
            <div>
              <h3>解析的數據：</h3>
              <pre>{JSON.stringify(uploadData, null, 2)}</pre>
            </div>
          )}
        </MliFormRow>
      </ProForm>
    </PageContainer >
  )
}

export default Xlsx
