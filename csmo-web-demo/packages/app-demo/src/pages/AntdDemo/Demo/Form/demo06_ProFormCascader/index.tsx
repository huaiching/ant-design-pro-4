import { MliFormRow } from '@mli-csmo/base'
import ProForm, { ProFormInstance, ProFormCascader } from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { Button, message } from 'antd'
import { useEffect, useRef } from 'react'
import { log } from 'console'
import { debounce } from 'lodash'

// 模擬數據
let data = {}

const Demo: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  useEffect(() => {
    // 預設帶入表單資料
    formRef.current?.setFieldsValue({
      ...data,
    })
  }, [])

  // 縣市與行政區的級聯數據
  const cityDistrictOptions = [
    {
      value: 'TP',
      label: '台北市',
      children: [
        { value: 'Zhongshan', label: '中山區' },
        { value: 'Songshan', label: '松山區' },
        { value: 'Daan', label: '大安區' },
        { value: 'Xinyi', label: '信義區' },
      ],
    },
    {
      value: 'NTPC',
      label: '新北市',
      children: [
        { value: 'Banqiao', label: '板橋區' },
        { value: 'Xinzhuang', label: '新莊區' },
        { value: 'Sanchong', label: '三重區' },
        { value: 'Zhonghe', label: '中和區' },
      ],
    },
    {
      value: 'TC',
      label: '台中市',
      children: [
        { value: 'West', label: '西區' },
        { value: 'North', label: '北區' },
        { value: 'Xitun', label: '西屯區' },
        { value: 'Nantun', label: '南屯區' },
      ],
    },
    {
      value: 'TN',
      label: '台南市',
      children: [
        { value: 'East', label: '東區' },
        { value: 'South', label: '南區' },
        { value: 'Anping', label: '安平區' },
        { value: 'Annan', label: '安南區' },
      ],
    },
    {
      value: 'KS',
      label: '高雄市',
      children: [
        { value: 'Qianzhen', label: '前鎮區' },
        { value: 'Lingya', label: '苓雅區' },
        { value: 'Sanmin', label: '三民區' },
        { value: 'Xiaogang', label: '小港區' },
      ],
    },
  ]

  // 飲料與品項的級聯數據（多選）
  const drinksOptions = [
    {
      value: 'tea',
      label: '茶類',
      children: [
        { value: 'black_tea', label: '紅茶' },
        { value: 'green_tea', label: '綠茶' },
        { value: 'oolong_tea', label: '烏龍茶' },
      ],
    },
    {
      value: 'coffee',
      label: '咖啡類',
      children: [
        { value: 'latte', label: '拿鐵' },
        { value: 'americano', label: '美式咖啡' },
      ],
    },
    {
      value: 'juice',
      label: '果汁類',
      children: [
        { value: 'orange_juice', label: '柳橙汁' },
        { value: 'apple_juice', label: '蘋果汁' },
      ],
    },
    {
      value: 'smoothie',
      label: '冰沙類',
      children: [
        { value: 'fruit_smoothie', label: '水果冰沙' },
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
              log('表單數據', data)
              formRef.current?.validateFields().then(() => {
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

  // 表單值變更處理，使用 debounce 限制觸發頻率
  const handleValueChange = debounce(() => {
    // 取得表單變更資料
    const values = formRef.current?.getFieldsValue()
    data = {
      ...values
    }
  }, 300)


  return (
    <PageContainer>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={submitterRender()}
        onValuesChange={handleValueChange}
      >
        <MliFormRow>
          <ProFormCascader
            name='cityDistrict'
            label='選擇縣市/區'
            placeholder='請選擇縣市與行政區'
            colSize={2}
            fieldProps={{
              showSearch: true, // 開啟搜尋功能
              options: cityDistrictOptions,
              changeOnSelect: false, // 僅在選擇最終層級時觸發值更新
            }}
            rules={[
              { required: true, message: '縣市與行政區為必填項' }
            ]}
          />
          <ProFormCascader
            name='drinks'
            label='選擇飲料/品項'
            placeholder='請選擇飲料品項（可多選）'
            colSize={2}
            fieldProps={{
              showSearch: true, // 開啟搜尋功能
              options: drinksOptions,
              multiple: true, // 啟用多選模式
              changeOnSelect: false, // 僅在選擇最終層級時觸發值更新
            }}
            rules={[
              { required: true, message: '飲料品項為必填項' }
            ]}
          />
        </MliFormRow>
      </ProForm>
    </PageContainer>
  )
}

export default Demo