import { ModalForm } from '@ant-design/pro-form'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { Button } from 'antd'
import { fetchData } from '../Store/apdtApi'

const OptionReceiveNo =  (props: any) => {

  const {formRef, showModal, setShowModal} = props

  const columns: ProColumns<any>[] = [
    {
      title: '受理號碼',
      dataIndex: 'poChgReceNo',
      valueType: 'text'
    },
    {
      title: '受理狀態',
      dataIndex: 'poChgStsCode',
      valueType: 'text'
    },
    {
      title: '受理日期',
      dataIndex: 'poChgReceDate',
      valueType: 'text'
    }
  ]

  return (
    <ModalForm
      layout='vertical'
      onVisibleChange={setShowModal}
      visible={showModal}
      modalProps={{
        closable: false,
        destroyOnClose: true
      }}
      submitter={false}
    >
        <ProTable
          name='testTable'
          columns={columns}
          rowKey='poChgReceNo'      // 設定 資料唯一值 欄位
          search={false}            // 關閉查詢框
          options={false}           // 關閉功能框
          request={async ()=>{      // 模擬透過 api 取得 受理資料
              const response = await fetchData()
              return {
                data: response,
                success: true,
                total: response.length
              }
          }}   // 數據請求函式
          pagination={{             // 開啟分頁選擇 + 限制 每頁 5 筆
            showQuickJumper: true,
            pageSize: 5
          }}
          rowSelection={{
            selections: true,
            type: 'radio'
          }}
          tableAlertOptionRender={({
              selectedRowKeys     // 選取行的key
            }) => {
              return (
                <Button type='link' onClick={()=>{
                  formRef.current?.setFieldsValue({
                    receiveNo: selectedRowKeys
                  })
                  setShowModal(false)
                }}>
                  確定
                </Button>
              )
          }}
        />
    </ModalForm>
  )
}

export default OptionReceiveNo
