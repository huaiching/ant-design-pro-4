import React from 'react'
import { Typography, Divider, List } from 'antd'
import { ProForm, PageContainer } from '@ant-design/pro-components'

const { Title, Paragraph, Text } = Typography

const MobXDocs: React.FC = () => {
  return (
    <PageContainer
      header={{
        ghost: true
      }}
    >
      <ProForm submitter={false} layout="vertical">
          <Typography>
            <Title level={2}>MobX 使用說明文件</Title>
            <Text>請搭配 使用範例 的 程式碼 觀看</Text>

            <Divider />

            <Title level={3}>1. 建立 Mobx 資料夾與 Store</Title>
            <List
              size="small"
              dataSource={[
                '1. 在 */Mobx 建立 userStore.ts',
                '2. 定義 TypeScript 型別 UserInfo',
                '3. 建立 UserStore 類別，包含：',
                '　- user 屬性（observable）',
                '　- constructor() 內呼叫 makeAutoObservable(this)',
                '　- 各種 set 方法（action）及 get 方法（computed）',
                '　- initUser() 初始化方法',
                '4. 匯出 UserStore 單例供全站共用',
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />

            <Divider />

            <Title level={3}>2. React 頁面中使用 MobX Store</Title>

            <Title level={4}>2.1 資料寫入 — 建立輸入元件（Create.tsx）</Title>
            <List
              size="small"
              dataSource={[
                '1. 使用 Ant Design 的 Form、Input 等元件建立輸入表單',
                '2. 表單送出事件（onFinish）呼叫 userStore.setUser() 寫入資料',
                '3. 使用 export default observer(ComponentName) 包裝元件，使組件響應 MobX 狀態改變',
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />

            <Title level={4}>2.2 資料讀取 — 建立顯示元件（Display.tsx）</Title>
            <List
              size="small"
              dataSource={[
                '1. 從 userStore 讀取資料，如 userStore.getName、userStore.getAge 等',
                '　可展示 computed 屬性，如 userStore.isAdult',
                '2. 使用 Ant Design 的 Descriptions 顯示狀態資料',
                '3. 使用 export default observer(ComponentName) 包裝元件，使組件響應 MobX 狀態改變',
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />

            <Divider />

            <Title level={3}>3. 重要說明</Title>
            <List
              size="small"
              dataSource={[
                'makeAutoObservable(this)：自動將屬性標為 observable，方法標為 action，getter 標為 computed',
                '任何寫入資料的操作都應該透過 Store 裡的 action（如 setUser、setName）',
                'React 元件必須使用 observer 包裝，才能正確監聽並響應 MobX 狀態變化',
                '匯出單例的 Store 讓整個專案共用相同狀態，保持資料一致性',
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Typography>
      </ProForm>
    </PageContainer >
  )
}

export default MobXDocs
