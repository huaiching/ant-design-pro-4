import ProForm, { ProFormInstance, ProFormTreeSelect } from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { MliFormRow } from '@mli-csmo/base'
import { Button, List, message, Modal } from 'antd'
import { useEffect, useRef } from 'react'

const Demo: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  // 初始載入時的設定
  useEffect(() => {
    // 讀取資料
    // ...

    // 離開頁面前的處理
    return () => {
      // 離開頁面前先將資料塞回 mobx
      handleValueChange()
    }
  }, []);

  // 表單值變更處理: 同步更新 Mobx 資料
  const handleValueChange = () => {
    const values = formRef.current?.getFieldsValue()
    // 呼叫 Mobx 的 setting
  }

  // 控制送出後之動作
  const submitterRender = () => {
    Modal.confirm({
      content: "確定要送出嗎？",
      onOk() {
        formRef.current?.validateFields().then(() => {
          const formRefData = formRef.current?.getFieldsValue()
          console.log('表單數據', formRefData);

          message.success('表單提交成功！')
        })
      },
      onCancel() {
        // 取消按鈕 點擊後 要進行的 API 操作
        message.warning('取消作業')
      }
    })
  }

  /** 下拉選單設定 **/
  // 部門與員工的樹形數據
  const departmentEmployeeOptions = [
    {
      title: '資訊開發一部',
      value: '90210',
      children: [
        { title: '精算商品資訊科', value: '90211' },
        { title: '保費財會資訊科', value: '90213' },
        { title: '資料處理資訊科', value: '90217' },
        { title: '業務資訊科', value: '90214' }
      ]
    },
    {
      title: '資訊開發二部',
      value: '90250',
      children: [
        { title: '保全資訊一科', value: '90251' },
        { title: '保全資訊二科', value: '90252' },
        { title: '核心理賠資訊科', value: '90253' },
        { title: '契約資訊科', value: '90255' }
      ]
    },
    {
      title: '數位資訊部',
      value: '90230',
      children: [
        { title: '投資系統科', value: '90231' },
        { title: '營運流程科', value: '90232' },
        { title: '網路數位科', value: '90233' }
      ]
    }
  ]

  // 產品與型號的樹形數據（多選）
  const productModelOptions = [
    {
      title: '手機',
      value: 'phone',
      children: [
        { title: 'iPhone 14', value: 'iphone_14' },
        { title: 'Galaxy S23', value: 'galaxy_s23' }
      ]
    },
    {
      title: '筆電',
      value: 'laptop',
      children: [
        { title: 'MacBook Pro', value: 'macbook_pro' },
        { title: 'ThinkPad X1', value: 'thinkpad_x1' }
      ]
    },
    {
      title: '配件',
      value: 'accessories',
      children: [
        { title: '無線耳機', value: 'wireless_earbuds' },
        { title: '充電器', value: 'charger' }
      ]
    }
  ]

  return (
    <PageContainer>
      <ProForm
        grid
        layout="vertical"
        formRef={formRef}
        submitter={false}
        onValuesChange={handleValueChange}
      >
        <MliFormRow>
          <ProFormTreeSelect
            name="departmentEmployee"
            label="選擇部門"
            placeholder="請選擇部門"
            colSize={2}
            fieldProps={{
              treeData: departmentEmployeeOptions,
              treeDefaultExpandAll: false, // 預設不展開所有節點
              allowClear: true, // 允許清空選擇
              showSearch: true // 開啟搜尋功能
            }}
            rules={[{ required: true, message: '部門為必填項' }]}
          />
          <ProFormTreeSelect
            name="products"
            label="選擇產品/型號"
            placeholder="請選擇產品型號（可多選）"
            colSize={2}
            fieldProps={{
              treeData: productModelOptions,
              multiple: true, // 啟用多選模式
              treeDefaultExpandAll: false, // 預設不展開所有節點
              allowClear: true, // 允許清空選擇
              showSearch: true // 開啟搜尋功能
            }}
            rules={[{ required: true, message: '產品型號為必填項' }]}
          />
        </MliFormRow>
        <List
          size="small"
          dataSource={['1. 多選預設開啟搜尋，單選要手動開啟', '2. 搜尋只能搜尋 value 的資料']}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />

        {/* 底部功能區 */}
        <FooterToolbar>
          <Button type='primary' onClick={submitterRender}>送出</Button>
        </FooterToolbar>
      </ProForm>
    </PageContainer>
  )
}

export default Demo
