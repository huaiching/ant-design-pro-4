import { MliFormRow } from '@mli-csmo/base'
import ProForm, { ProFormInstance, ProFormTreeSelect } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, List, message } from 'antd'
import { useRef } from 'react'

const Demo: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  // 部門與員工的樹形數據
  const departmentEmployeeOptions = [
    {
      title: '工程部門',
      value: 'engineering',
      children: [
        { title: '前端開發', value: 'frontend' },
        { title: '後端開發', value: 'backend' },
        { title: '資料科學', value: 'data_science' },
      ],
    },
    {
      title: '行銷部門',
      value: 'marketing',
      children: [
        { title: '數位行銷', value: 'digital_marketing' },
        { title: '內容行銷', value: 'content_marketing' },
      ],
    },
    {
      title: '財務部門',
      value: 'finance',
      children: [
        { title: '會計', value: 'accounting' },
        { title: '財務分析', value: 'financial_analysis' },
      ],
    },
  ]

  // 產品與型號的樹形數據（多選）
  const productModelOptions = [
    {
      title: '手機',
      value: 'phone',
      children: [
        { title: 'iPhone 14', value: 'iphone_14' },
        { title: 'Galaxy S23', value: 'galaxy_s23' },
      ],
    },
    {
      title: '筆電',
      value: 'laptop',
      children: [
        { title: 'MacBook Pro', value: 'macbook_pro' },
        { title: 'ThinkPad X1', value: 'thinkpad_x1' },
      ],
    },
    {
      title: '配件',
      value: 'accessories',
      children: [
        { title: '無線耳機', value: 'wireless_earbuds' },
        { title: '充電器', value: 'charger' },
      ],
    },
  ]

  // 控制送出後之動作
  const submitterRender = () => {
    return {
      render: () => (
        <FooterToolbar>
          <Button
            type='primary'
            onClick={async () => {
              formRef.current?.validateFields().then(() => {
                // 確認按鈕 點擊後 要進行的 API 操作
                console.info(formRef.current?.getFieldsValue())
                message.success('表單提交成功！')
              })
            }}
            key='save'
          >
            確認
          </Button>
          <Button
            onClick={async () => {
              // 取消按鈕 點擊後 要進行的 API 操作
              message.warning('取消作業')
            }}
          >
            取消
          </Button>
        </FooterToolbar>
      )
    }
  }

  return (
    <>
      <h1>ProFormTreeSelect</h1>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
      >
        <MliFormRow>
          <ProFormTreeSelect
            name='departmentEmployee'
            label='選擇部門/員工'
            placeholder='請選擇部門或員工'
            colSize={2}
            fieldProps={{
              treeData: departmentEmployeeOptions,
              treeDefaultExpandAll: false, // 預設不展開所有節點
              allowClear: true, // 允許清空選擇
              showSearch: true  // 開啟搜尋功能
            }}
            rules={[
              { required: true, message: '部門或員工為必填項' }
            ]}
          />
          <ProFormTreeSelect
            name='products'
            label='選擇產品/型號'
            placeholder='請選擇產品型號（可多選）'
            colSize={2}
            fieldProps={{
              treeData: productModelOptions,
              multiple: true, // 啟用多選模式
              treeDefaultExpandAll: false, // 預設不展開所有節點
              allowClear: true, // 允許清空選擇
              showSearch: true  // 開啟搜尋功能
            }}
            rules={[
              { required: true, message: '產品型號為必填項' }
            ]}
          />
        </MliFormRow>
        <List
          size="small"
          dataSource={[
            "1. 多選預設開啟搜尋，單選要手動開啟",
            "2. 搜尋只能搜尋 value 的資料"
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </ProForm>
    </>
  )
}

export default Demo