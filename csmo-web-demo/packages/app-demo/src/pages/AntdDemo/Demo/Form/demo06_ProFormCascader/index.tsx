import { MliFormRow } from '@mli-csmo/base'
import ProForm, { ProFormInstance, ProFormCascader } from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { Button, message, Modal } from 'antd'
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


  return (
    <PageContainer>
      <ProForm
        grid
        layout='vertical'
        formRef={formRef}
        submitter={false}
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

        {/* 底部功能區 */}
        <FooterToolbar>
          <Button type='primary' onClick={submitterRender}>送出</Button>
        </FooterToolbar>
      </ProForm>
    </PageContainer>
  )
}

export default Demo