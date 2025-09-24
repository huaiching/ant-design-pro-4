import { PageContainer, ProTable } from '@ant-design/pro-components'
import { Alert } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'

const TableOriginal: React.FC = () => {
  // 欄位定義
  const columns: any[] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年齡', dataIndex: 'age', key: 'age' }
  ]

  return (
    <PageContainer
      header={{
        title: 'Demo OriginalTable',
        ghost: true
      }}
    >
      {/* 頁面上顯示說明（文字或提醒區塊） */}
      <Alert
        message="這是 ProTable 範例頁面"
        description={
          <Paragraph>
            此頁面使用 <code>PageContainer</code> 搭配 <code>ProTable</code>，展示資料表格與 API 請求處理。
            <br />
            原始程式中也包含註解，方便開發與維護。
          </Paragraph>
        }
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {/* 表格元件 */}
      <ProTable
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
      />
    </PageContainer>
  )
}

export default TableOriginal