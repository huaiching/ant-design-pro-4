import { PageContainer } from '@ant-design/pro-components'
import { MliTable } from '@mli-csmo/base'
import { Alert } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'

const TableMli: React.FC = () => {
  const demo = 'demo.table'
  // 欄位定義
  const columns: any[] = [
    {
      moduleName: demo,
      columnName: 'id',
      dataIndex: 'id',
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      moduleName: demo,
      columnName: 'name',
      dataIndex: 'name',
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      moduleName: demo,
      columnName: 'age',
      dataIndex: 'age',
      render: (text: any) => {
        return text?.props?.children
      }
    }
  ]

  return (
    <PageContainer
      header={{
        title: 'Demo MliTable',
        ghost: true
      }}
    >

      {/* 頁面上顯示說明（文字或提醒區塊） */}
      <Alert
        message="這是 MliTable 範例頁面"
        description={
          <Paragraph>
            此頁面使用 <code>PageContainer</code> 搭配 <code>MliTable</code>，展示資料表格與 API 請求處理。
            <br />
            MliTable已包裝好按鈕與Table樣式, 且與ProTable的API通用, 但名稱需透過ts檔管理。
          </Paragraph>
        }
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <MliTable
        moduleName='demo'
        // 傳入你定義好的欄位表達式，Table會幫你渲染
        columns={columns}
        request={async () => {
          return {
            data: [
              { id: 1, name: '小明', age: 25 },
              { id: 2, name: '小華', age: 30 }
            ],
            success: true,
            total: 2
          }
        }}
        // 一定要有
        rowKey="id"
        // search會依據欄位產生相對應的查詢欄位
        // 有多少欄位產生多少
        search={undefined}
        // Page理論上會由中、後台提供相關數據，這裡暫且寫死
        pagination={{ pageSize: 5 }}
      >

      </MliTable>
    </PageContainer>
  )
}

export default TableMli